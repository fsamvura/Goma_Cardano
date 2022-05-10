{-# LANGUAGE DataKinds #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE MultiParamTypeClasses      #-}
{-# LANGUAGE OverloadedStrings          #-}
{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeApplications #-}
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE TypeOperators #-}
{-# LANGUAGE NoImplicitPrelude #-}
{-# OPTIONS_GHC -fno-warn-unused-imports #-}

module Escrow.EkivalEscrow where

import              Ledger              hiding (singleton)
import              Ledger.Typed.Scripts
import              Ledger.Value        as Value
import              Ledger.Ada
import qualified    PlutusTx
import              PlutusTx.Prelude    hiding (Semigroup (..), unless)
import              Prelude             (Show (..))
import qualified    Prelude               as Haskell

data EkivalParam = EkivalParam
    { ekivalAddress :: !PubKeyHash
      ,fees         :: !Integer
     }

PlutusTx.makeLift ''EkivalParam

data EkivalEscrowDatum = EkivalEscrowDatum
  {
    providerAddress     :: !PubKeyHash
  , funderAddress       :: !PubKeyHash
  , lovelaceAmount      :: !Integer
  , minValue            :: !Integer
  , expirationTime      :: !POSIXTime
  , serviceType         :: !Integer
  , commitStatus        :: !Integer
  }

PlutusTx.unstableMakeIsData ''EkivalEscrowDatum

-- Ekival Escrow
-- A provider of funds, services or goods offers them for exchange
-- A consummer commits to providing equal value for the transfer
-- In any case, for now, the following actions will do:

data EkivalAction = CancelP | CancelF | Update | CommitA | CommitP | Complete
  deriving Show

PlutusTx.makeIsDataIndexed ''EkivalAction [('CancelP, 0), ('CancelF, 1), ('Update, 2), ('CommitA, 3) , ('CommitP, 4), ('Complete, 5)]
PlutusTx.makeLift ''EkivalAction


{-# INLINEABLE mkValidator #-}
mkValidator :: EkivalParam -> EkivalEscrowDatum -> EkivalAction -> ScriptContext -> Bool
mkValidator ep dat action ctx =
  case action of
    CancelP     ->  traceIfFalse "Only Provider can Cancel Transfer"            (signedByProvider || signedByEkival) &&
                    traceIfFalse "Fees Paid"                                    ekivalFeesPaid  &&
                    traceIfFalse "Funds sent to Funders"                        fundsToFunders
    
    CancelF     ->  traceIfFalse "Only Funder can Cancel Transfer"            (signedByFunder || signedByEkival) &&
                    traceIfFalse "Fees Paid"                                    ekivalFeesPaid  &&
                    traceIfFalse "Fees sent to Provider"                        feesToProvider &&
                    traceIfFalse "Balance sent to Funder"                         balanceToFunder

    Update      ->  traceIfFalse "Only Provider can Update Transfer"            signedByProvider &&
                    traceIfFalse "Update must create one new Transfer UTXO"     createsContinuingTransfer &&
                    traceIfFalse "Only Uncommitted Funds can be changed"        outputFulfillsStatus &&
                    traceIfFalse "The change cannot be negative"                outputFulfillsValue &&
                    traceIfFalse "Deposit must be kept to the new UTXO"         outputFulfillsDeposit
                    -- check that datum is updated accurately
                    -- traceIfFalse "New expiration time must be on or after old"  extendsExpirationTime &&
                    -- traceIfFalse "Bounty amounts can only be increased"         increasesBounty
    CommitA      -> traceIfFalse "Funder must sign to lock funds"               signedByFunder &&
                    traceIfFalse "Update must create one new Transfer UTXO"     createsContinuingTransfer &&
                    traceIfFalse "Value and Deposit have to be at UTXO"         outputFulfillsFullvalue

    CommitP     -> traceIfFalse "Funder must sign to lock funds"                signedByFunder &&
                    traceIfFalse "Update must create two new Transfer UTXOs"    createsContinuingTransfer &&
                    traceIfFalse "Value have to be at the other UTXO"           outputFulfillsPartvalue

    Complete    ->  traceIfFalse "Provider must sign to claim funds"        (signedByProvider || signedByEkival) &&
                    traceIfFalse "Fees Paid"                                    ekivalFeesPaid  &&
                    traceIfFalse "Funds sent to Funders"                        fundsToProvider

  where
    info :: TxInfo
    info = scriptContextTxInfo ctx

    signedByProvider :: Bool
    signedByProvider = txSignedBy info $ providerAddress  dat

    signedByFunder :: Bool
    signedByFunder = txSignedBy info $ funderAddress  dat

    signedByEkival :: Bool
    signedByEkival = txSignedBy info $ ekivalAddress ep

    deadlineReached :: Bool
    deadlineReached = contains (from $ expirationTime dat) $ txInfoValidRange info

    -- Update means that a UTXO must be left at contract address
    outputsToContract :: [TxOut]
    outputsToContract = getContinuingOutputs ctx

    createsContinuingTransfer :: Bool
    createsContinuingTransfer = length outputsToContract == 1

    outputContainsPartValue :: [TxOut] -> Bool
    outputContainsPartValue [x]   = (getLovelace $ fromValue $ txOutValue x) >= (lovelaceAmount dat)
    outputContainsPartValue _     = False

    outputContainsFullValue :: [TxOut] -> Bool
    outputContainsFullValue [x]   = (getLovelace $ fromValue $ txOutValue x) >= (lovelaceAmount dat)
    outputContainsFullValue _     = False

    outputFulfillsValue :: Bool
    outputFulfillsValue = outputContainsFullValue outputsToContract

    outputFulfillsStatus :: Bool
    outputFulfillsStatus = True 

    outputFulfillsDeposit :: Bool
    outputFulfillsDeposit = True

    outputFulfillsPartvalue :: Bool
    outputFulfillsPartvalue = True

    outputFulfillsFullvalue :: Bool
    outputFulfillsFullvalue = outputContainsFullValue outputsToContract
    -- Values Paid to Different Recipients

    valueToFunder :: Value
    valueToFunder = valuePaidTo info $ funderAddress dat

    valueToEkival :: Value
    valueToEkival = valuePaidTo info $ ekivalAddress ep

    valueToProvider :: Value
    valueToProvider = valuePaidTo info $ providerAddress dat


    -- The value sent to Funder must be equal to what they deposited at the UTXO
    -- contributor must get tokenAmount bp of gimbals and lovelaceAmount bp...
    fundsToFunders :: Bool
    fundsToFunders = (getLovelace $ fromValue valueToFunder) >= (lovelaceAmount dat)

    ekivalFeesPaid :: Bool
    ekivalFeesPaid =(getLovelace $ fromValue valueToEkival) >= (fees ep)

    feesToProvider :: Bool
    feesToProvider = (getLovelace $ fromValue valueToProvider) >= (fees ep)

    balanceToFunder :: Bool
    balanceToFunder = (getLovelace $ fromValue valueToFunder) >= (lovelaceAmount dat - fees ep)

    fundsToProvider :: Bool
    fundsToProvider = (getLovelace $ fromValue valueToProvider) >= (lovelaceAmount dat)

    -- START TASK --------------------------------------------------------------------------------------------------------------
    -- PPBL Bounty Task:
    -- write extendsExpirationTime and increasesBounty that compare datum on incoming UTXO to datum on outgoing UTXO

    -- returns true if updated expirationTime is on or after previous expirationTime
    -- extendsExpirationTime :: Bool
    -- extendsExpirationTime = True

    -- returns true if updated lovelaceAmount and tokenAmount are greater than or equal to previous
    -- increasesBounty :: Bool
    -- increasesBounty = True

    -- Use findDatum or findDatumHash?
    -- Docs: https://playground.plutus.iohkdev.io/doc/haddock/plutus-ledger-api/html/Plutus-V1-Ledger-Contexts.html#v:findDatum

    -- END TASK ----------------------------------------------------------------------------------------------------------------

data EscrowTypes

instance ValidatorTypes EscrowTypes where
    type DatumType EscrowTypes = EkivalEscrowDatum
    type RedeemerType EscrowTypes = EkivalAction

typedValidator :: EkivalParam -> TypedValidator EscrowTypes
typedValidator bp =
  mkTypedValidator @EscrowTypes
    ($$(PlutusTx.compile [||mkValidator||]) `PlutusTx.applyCode` PlutusTx.liftCode bp)
    $$(PlutusTx.compile [||wrap||])
  where
    wrap = wrapValidator @EkivalEscrowDatum @EkivalAction

validator :: EkivalParam -> Validator
validator = validatorScript . typedValidator
