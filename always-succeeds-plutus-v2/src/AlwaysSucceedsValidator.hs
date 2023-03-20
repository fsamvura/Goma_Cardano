{-# LANGUAGE DataKinds         #-}
{-# LANGUAGE NoImplicitPrelude #-}
{-# LANGUAGE TemplateHaskell   #-}
{-# LANGUAGE ImportQualifiedPost #-}
{-# LANGUAGE DeriveAnyClass #-}
{-# LANGUAGE DeriveGeneric  #-}
{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE TypeApplications       #-}
{-# LANGUAGE TypeFamilies           #-}
{-# LANGUAGE TypeOperators          #-}

module AlwaysSucceedsValidator where

import Cardano.Api.Shelley (PlutusScript (..), PlutusScriptV2)
import Codec.Serialise
import Data.ByteString.Lazy qualified as LBS
import Data.ByteString.Short qualified as SBS
import Data.Aeson (ToJSON, FromJSON)
import GHC.Generics  (Generic)
import              Plutus.Script.Utils.V1.Typed.Scripts.Validators (DatumType, RedeemerType)
import              Plutus.Script.Utils.V2.Typed.Scripts (ValidatorTypes, TypedValidator, mkTypedValidator, mkTypedValidatorParam, validatorScript, mkUntypedValidator)
import              PlutusTx
import Plutus.V2.Ledger.Api
import Plutus.V1.Ledger.Value
import Plutus.V2.Ledger.Contexts  as V2
import PlutusTx qualified
import PlutusTx.Builtins
import PlutusTx.Eq as PlutusTx
import  qualified   Prelude                     as  Haskell
import              PlutusTx.Prelude                          ( Bool (False, True),
                                                                BuiltinData,
                                                                Integer,
                                                                Maybe (Just, Nothing),
                                                                Either (Left, Right),
                                                                otherwise,
                                                                quotient,
                                                                traceIfFalse,
                                                                traceError,
                                                                remainder,
                                                                all,
                                                                (.),
                                                                (!!),
                                                                ($),
                                                                (&&),
                                                                (*),
                                                                (+),
                                                                (-),
                                                                (/=),
                                                                (<=),
                                                                (<>),
                                                                (==),
                                                                (>),
                                                                (>=),
                                                                (<),
                                                                (<=),
                                                                (||),
                                                                (++)
                                                              )

-- serialiseData is a PlutusV2 builtin
data HotelParams = HotelParams
    {
        proprioAddress  ::  !PubKeyHash
    } deriving    (Eq, Haskell.Show, Generic)

PlutusTx.makeLift ''HotelParams

data HotelDatum = HotelDatum
    {   clientAddress   ::  !PubKeyHash
    ,   numeroChambre   ::  !Integer
    ,   prixMontant     ::  !Integer
    ,   jourArrivee     ::  !Integer
    ,   dureeSejour     ::  !Integer
      }     
    deriving    (Eq, Haskell.Show, Generic)

-- PlutusTx.makeLift ''HotelDatum

data HotelAction = ClientR | ClientP | ClientA | ProprioM Integer
    deriving    (Haskell.Show, Generic, FromJSON, ToJSON, Eq)

PlutusTx.makeIsDataIndexed ''HotelAction [('ClientR, 0), ('ClientP, 1) , ('ClientA, 2) , ('ProprioM, 3)]
-- PlutusTx.makeLift ''HotelAction

{-# INLINABLE reservationDatum #-}
reservationDatum :: Maybe Datum -> Maybe HotelDatum
reservationDatum md = do
    Datum d <- md
    fromBuiltinData d

{-# INLINABLE hotelValidateur #-}
hotelValidateur :: HotelParams -> HotelDatum -> HotelAction -> V2.ScriptContext -> Bool
hotelValidateur hp dat action ref = 
  case action of

    ClientR     ->  traceIfFalse "Caution manquante"                            cautionPayee  &&
                    traceIfFalse "Contrat doit être publié"                     contratCourant

    ClientP     ->  traceIfFalse "Seul le Client initial peut payer"            signeParClient &&
                    traceIfFalse "Prix non totalement payée"                    hotelFraisPaye &&
                    traceIfFalse "Clé non envoyée au Client"                    hotelCleNft &&
                    traceIfFalse "Payement doit être envoyé au Proprio"         hotelProprioPaye 
                    

    ClientA     ->  traceIfFalse "Seul le Client initial peut annuler"         signeParClient &&
                    traceIfFalse "Caution doit être retenue"                   cautionRetenue &&
                    traceIfFalse "Jour d'arrivée déjà atteint"                 dateArriveeAtteinte

    ProprioM prix  ->  traceIfFalse "Seul le Proprio peut modifier la chambre"     signeParProprio &&
                   traceIfFalse "Contrat doit être publié"                     contratCourant
  where
    info :: TxInfo
    info = scriptContextTxInfo ref

    proprioPkh :: PubKeyHash
    proprioPkh = proprioAddress hp

    clientPkh :: PubKeyHash
    clientPkh = clientAddress dat

    signeParProprio :: Bool
    signeParProprio = txSignedBy info $ proprioAddress dat

    signeParClient :: Bool
    signeParClient = txSignedBy info $ clientAddress dat


    -- Montants payés aux différents Bénéficiaires

    montantAuProprio :: Value
    montantAuProprio = valuePaidTo info proprioPkh

    montantAuClient :: Value
    montantAuClient = valuePaidTo info clientPkh

    -- Évaluation des Entrants et Sortants au Contrat

    envoisAuContrat :: [TxOut]
    envoisAuContrat = getContinuingOutputs ref

    nosEnvois :: TxOut
    nosEnvois = case getContinuingOutputs ref of
        [o] -> o
        _   -> traceError "Nous voulons juste une seule réservation"

    envoisDatumByHash :: DatumHash -> Maybe Datum
    envoisDatumByHash h = findDatum h info

    nosEnvoisDatum :: TxOut -> Maybe HotelDatum
    nosEnvoisDatum TxOut{txOutDatum=OutputDatumHash h} = reservationDatum $ envoisDatumByHash h
    nosEnvoisDatum _                                   = Nothing

    chambreDatum :: TxOut -> HotelDatum
    chambreDatum txOut = case nosEnvoisDatum txOut of
      Nothing -> traceError "Cette chambre n'a pas été réservée"
      Just d  -> d

    {- hotelFraisPaye :: [TxOut] -> Bool
    hotelFraisPaye [x]   = (valueOf (txOutValue x)  >= (prixMontant dat))
    hotelFraisPaye _     = False -}

    -- Les Montants envoyés peuvent contenir des Ada ou d'autre monnaies
    -- Nous utilisons des Ada d'abord...
    adaAuProprio :: Integer
    adaAuProprio = valueOf montantAuProprio (adaSymbol) (adaToken )

    hotelFraisPaye :: Bool
    hotelFraisPaye = (adaAuProprio) >= (prixMontant dat)

    cautionPayee :: Bool
    cautionPayee = True

    contratCourant :: Bool
    contratCourant = True

    hotelCleNft :: Bool
    hotelCleNft = True

    hotelProprioPaye :: Bool
    hotelProprioPaye = True

    cautionRetenue :: Bool
    cautionRetenue = True

    dateArriveeAtteinte :: Bool
    dateArriveeAtteinte = True
    

   
data HotelDataTypes
instance ValidatorTypes HotelDataTypes where
    type instance DatumType HotelDataTypes = HotelDatum
    type instance RedeemerType HotelDataTypes = HotelAction

typedHotelValidator :: HotelParams-> TypedValidator HotelDataTypes
typedHotelValidator hp = go hp where
    go = mkTypedValidatorParam @HotelDataTypes
        $$(PlutusTx.compile [|| hotelValidateur ||])
        $$(PlutusTx.compile [|| wrap ||])
    wrap = mkUntypedValidator

validator :: HotelParams->Validator
validator = validatorScript . typedHotelValidator

