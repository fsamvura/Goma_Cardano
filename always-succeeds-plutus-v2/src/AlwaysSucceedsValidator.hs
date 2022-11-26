{-# LANGUAGE DataKinds         #-}
{-# LANGUAGE NoImplicitPrelude #-}
{-# LANGUAGE TemplateHaskell   #-}
{-# LANGUAGE ImportQualifiedPost #-}

module AlwaysSucceedsValidator where

import Cardano.Api.Shelley (PlutusScript (..), PlutusScriptV2)
import Prelude hiding (($), (&&))

import Codec.Serialise
import Data.ByteString.Lazy qualified as LBS
import Data.ByteString.Short qualified as SBS

import Plutus.Script.Utils.V2.Typed.Scripts.Validators as Scripts
import Plutus.V2.Ledger.Api qualified as Plutus
import Plutus.V2.Ledger.Contexts as V2
import PlutusTx qualified
import PlutusTx.Builtins
import PlutusTx.Eq as PlutusTx
import PlutusTx.Prelude hiding (Semigroup (..), unless, (.))
import PlutusTx.Prelude qualified as PlutusPrelude

-- serialiseData is a PlutusV2 builtin

{-# INLINABLE mkValidator #-}
mkValidator :: BuiltinData -> Integer -> V2.ScriptContext -> Bool
mkValidator _ redeemer _ = traceIfFalse "Le Redempteur est Incorrect" $ redeemer PlutusPrelude.== 42
  

validator :: Plutus.Validator
validator = Plutus.mkValidatorScript
   $$(PlutusTx.compile [|| wrap ||])
 where
   wrap = Scripts.mkUntypedValidator mkValidator