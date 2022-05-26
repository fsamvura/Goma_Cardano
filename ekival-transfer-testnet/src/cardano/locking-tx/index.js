import Cardano from '../serialization-lib'

import {
    assetsToValue,
    createTxOutput,
    finalizeTx,
    initializeTx,
} from "../transaction";
import { fromBech32, fromHex } from "../../utils/converter";
import { treasuryContractAddress, treasuryIssuerAddress, transferProviderAddress } from '../treasury-contract';
import { serializeTreasuryDatum } from '../treasury-contract/datums';
import { createTreasuryDatum } from '../../utils/factory';

// locking-tx

export const lockingTx = async ({ address, utxosParam, lovelace }) => {
    try {
        const { txBuilder, outputs } = initializeTx();
        const utxos = utxosParam.map((utxo) =>
            Cardano.Instance.TransactionUnspentOutput.from_bytes(fromHex(utxo))
        );

        const tDatum = createTreasuryDatum(address, address, "800000000", "200000000", "1651025390000", "1", "0")
        const treasuryDatum = serializeTreasuryDatum(tDatum)

        console.log("you want to send", lovelace)

        outputs.add(
            createTxOutput(
                Cardano.Instance.Address.from_bech32(treasuryContractAddress),
                assetsToValue([
                    { unit: "lovelace", quantity: `${lovelace}` }
                ]),
                { datum: treasuryDatum }
            )
        )


        // just logging
        console.log("txBuilder", txBuilder)

        // Lets turn that memo into bonafide metadata

        // Then let's see about attaching gimbals to a transaction
        // How to deal with units on Gimbals (6 decimals)

        const txHash = await finalizeTx({
            txBuilder,
            utxos,
            outputs,
            changeAddress: fromBech32(address),
        })

        return {
            txHash,
        };
    }
    catch (error) {
        console.log(error, "in lockingTx")
    }


};
