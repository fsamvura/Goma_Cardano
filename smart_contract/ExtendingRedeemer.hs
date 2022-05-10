{-# LANGUAGE DataKinds           #-}
{-# LANGUAGE FlexibleContexts    #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE NoImplicitPrelude   #-}
{-# LANGUAGE OverloadedStrings   #-}
{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE TemplateHaskell     #-}
{-# LANGUAGE TypeApplications    #-}
{-# LANGUAGE TypeFamilies        #-}
{-# LANGUAGE TypeOperators       #-}

module Project03.ExtendingRedeemer where

import           Data.Map            as Map
import           Data.Text           (Text)
import           Data.Void           (Void)
import           Plutus.Contract
import           PlutusTx            (Data (..))
import qualified PlutusTx
import qualified PlutusTx.Builtins   as Builtins
import           PlutusTx.Prelude    hiding (Semigroup(..), unless)
import           Ledger              hiding (singleton)
import           Ledger.Constraints  as Constraints
import qualified Ledger.Typed.Scripts as Scripts
import           Ledger.Ada          as Ada
import           Prelude             (IO, Semigroup (..), Show (..), String)
import           Text.Printf         (printf)

{-# OPTIONS_GHC -fno-warn-unused-imports #-}

data GameAction = Guess Integer | EndGame
    deriving Show

-- PlutusTx.unstableMakeIsData ''GameAction
PlutusTx.makeIsDataIndexed ''GameAction [('Guess, 0), ('EndGame, 1)]
PlutusTx.makeLift ''GameAction

data GameParam = GameParam
    { gameHost :: !PaymentPubKeyHash
    , answer   :: !Integer
    }

PlutusTx.makeLift ''GameParam

-- Bounty: 25000 gimbals + 50 ADA for anyone who can write documentation of how to build a redeemer
-- that makes this script work on cardano-cli

{-# INLINABLE mkValidator #-}
mkValidator :: GameParam -> Integer -> GameAction -> ScriptContext -> Bool
mkValidator gp num action ctx =
    case action of
        Guess n  -> traceIfFalse "Your guess is wrong!" (n == answer gp) &&
                    traceIfFalse "You need a game play token" checkHasPlayToken &&
                    traceIfFalse "You must send at least 5 tAda to the contract" checkIsGambling
        EndGame  -> traceIfFalse "You are not the host of this Guess" checkIsHost
    where
        info :: TxInfo
        info = scriptContextTxInfo ctx

        -- checkGuess :: Bool
        -- checkGuess = True

        checkHasPlayToken :: Bool
        checkHasPlayToken = True

        checkIsGambling :: Bool
        checkIsGambling = True

        checkIsHost :: Bool
        checkIsHost = True

        checkIsPastDeadline :: Bool
        checkIsPastDeadline = True

data GuessingGame
instance Scripts.ValidatorTypes GuessingGame where
    type instance DatumType GuessingGame = Integer
    type instance RedeemerType GuessingGame = GameAction

typedValidator :: GameParam -> Scripts.TypedValidator GuessingGame
typedValidator gp = Scripts.mkTypedValidator @GuessingGame
    ($$(PlutusTx.compile [|| mkValidator ||]) `PlutusTx.applyCode` PlutusTx.liftCode gp)
    $$(PlutusTx.compile [|| wrap ||])
  where
    wrap = Scripts.wrapValidator @Integer @GameAction

validator :: GameParam -> Validator
validator = Scripts.validatorScript . typedValidator