# Always Succeeds PlutusV2
Minimal implementation of a Plutus project, built using [Plutus Apps](https://github.com/input-output-hk/plutus-apps) tag `v1.0.0-alpha1`.

Note: we may be waiting on Protocol Parameters to update with PlutusV2 cost models. Until then, here is what works on Preview.

## Guiding Question: How are PlutusV2 transactionss different from PlutusV1 transactions?

## Process
- We will follow the process outlined in the [Cardano Node documentation](https://github.com/input-output-hk/cardano-node/blob/master/doc/reference/plutus/babbage-script-example.md), simplified for clarity.
- Before getting started, remember that this example is written for the Cardano **Preview** Testnet.

### Transaction #1: Create a Reference UTxO

##### Set Variables:
```
SENDER=
SENDERKEY=
TXIN=
TX_REF_ADDR=
CONTRACT_ADDR=addr_test1wqag3rt979nep9g2wtdwu8mr4gz6m4kjdpp5zp705km8wys6t2kla
PLUTUS_SCRIPT="<YOUR PATH TO>/always-succeeds-plutus-v2/output/always-succeeds-plutus-v2.plutus"
```

##### Where:
- `$TX_REF_ADDR` is a regular wallet. We can store reference utxos at any Cardano address.
- `$CONTRACT_ADDR` and `$PLUTUS_SCRIPT` play the same roles as in PlutusV1: but we will use them differently here.
- `TXIN` is a simple UTxO owned by `$SENDER`. In this case, we will only include `lovelace`. Remember that this is the "Always Succeeds" contract, so actually, you could include any assets you want.

##### Now build the transaction:
We will create three outputs:
1. A reference UTxO that can be used in the future to reference this Plutus Script.
2. A UTxO at the `$CONTRACT_ADDR`, that locks tokens as usual. We will attach new "Inline Datum" to this UTxO, which has consequences in the Unlocking Transaction.
3. A change UTxO, back to `$SENDER`.

```
cardano-cli transaction build \
--babbage-era \
--testnet-magic 2 \
--change-address $SENDER \
--tx-in $TXIN \
--tx-out $TX_REF_ADDR+2000000 \
--tx-out-reference-script-file $PLUTUS_SCRIPT \
--tx-out $CONTRACT_ADDR+15000000 \
--tx-out-inline-datum-value 1618 \
--protocol-params-file param-preview.json \
--out-file tx.draft

cardano-cli transaction sign \
--tx-body-file tx.draft \
--testnet-magic 2 \
--signing-key-file $SENDERKEY \
--out-file tx.signed

cardano-cli transaction submit \
--testnet-magic 2 \
--tx-file tx.signed
```

The result of this tx is that:
1. 15000000 `lovelace` are locked at $`CONTRACT_ADDR`
2. If you query `$CONTRACT_ADDR`, you'll see a different sort of `ScriptDataNumber` there.
3. There is a UTxO at `$TX_REF_ADDR`, but it is not clear how this UTxO is distinguished via the normal `cardano-cli query utxo`. We will need to follow up on this!
4. `--tx-out-inline-datum-value` can used to create reference UTxOs at addresses other than the Contract Address. We will play with this in `PPBL Faucet PlutusV2`.

##### Here is a quick example of how to create a reference UTxO with Datum:
We will not use it in this example, but if you are curious:

```
cardano-cli transaction build \
--babbage-era \
--testnet-magic 2 \
--change-address $SENDER \
--tx-in $TXIN \
--tx-out $TX_REF_ADDR+2900000 \
--tx-out-inline-datum-value 1618 \
--protocol-params-file param-preview.json \
--out-file tx.draft
```
### Transaction #2: Unlock Tokens from Always Succeeds Contract

##### Set Variables:

```
SENDER_TX_IN=
COLLATERAL_UTXO=
CONTRACT_UTXO=
REFERENCE_TX_IN=
```

##### Where:
- `$SENDER_TX_IN` should cover any fees.
- `$COLLATERAL_UTXO` is owned by `$SENDER`
- `CONTRACT_UTXO` is what we are trying to unlock. Query `$CONTRACT_ADDR` to get it.
- `REFERENCE_TX_IN` is the reference UTxO that we created in Transaction #1. Query `$TX_REF_ADDR` to get it.

##### Now build the transaction:
- You could partially unlock the Contract UTxO by sending the remainder of tokens back to the Contract Address. Here, we simply unlock all funds from Transaction #1, and no matter what we specify to send to the `$SENDER` in the only `--tx-out`, the rest of the tokens are included with `--change-address`.
- Note the use of `--spending-tx-in-reference` after `--tx-in $CONTRACT_UTXO \`. This is new in the Babbage Era. It must be followed by `--spending-plutus-script-v2`.
- There are a few ways to work with datum. Here, we note that `--spending-reference-tx-in-inline-datum-present`, because we used `--tx-out-inline-datum-value 1618` in the locking transaction.

```
cardano-cli transaction build \
--babbage-era \
--testnet-magic 2 \
--tx-in $SENDER_TX_IN \
--tx-in-collateral $COLLATERAL_UTXO \
--tx-in $CONTRACT_UTXO \
--spending-tx-in-reference $REFERENCE_TX_IN \
--spending-plutus-script-v2 \
--spending-reference-tx-in-inline-datum-present \
--spending-reference-tx-in-redeemer-value 101 \
--tx-out $SENDER+3999999 \
--change-address $SENDER \
--protocol-params-file param-preview.json \
--out-file unlock-always-succeeds-plutus-v2.draft

cardano-cli transaction sign \
--tx-body-file unlock-always-succeeds-plutus-v2.draft \
--testnet-magic 2 \
--signing-key-file $SENDERKEY \
--out-file unlock-always-succeeds-plutus-v2.signed

cardano-cli transaction submit \
--testnet-magic 2 \
--tx-file unlock-always-succeeds-plutus-v2.signed
```