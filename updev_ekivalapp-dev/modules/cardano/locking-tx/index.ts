import Cardano from '../serialization-lib'
import {
    assetsToValue,
    createTxOutput,
    finalizeTx,
    initializeTx,
} from "../transaction";
import { adaToUsdConversionRate, removeFloat, fromBech32, fromHex, toLovelace } from "../../../utils/converter";
import { treasuryContractAddress } from '../treasury-contract';
import { serializeTreasuryDatum } from '../treasury-contract/datums';
import { createTreasuryDatum } from '../../../utils/factory';

// @ts-ignore
export const lockingTx = async ({ address, utxosParam, amountInUsd, amountInAda, conversionRate, minAmount, validityInDays, location, paymentMethod, contactName, contactEmail, contactPhone }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { txBuilder, outputs } = initializeTx();
            const utxos = utxosParam.map((utxo: string) =>
                Cardano?.Instance?.TransactionUnspentOutput.from_bytes(fromHex(utxo))
            );

            const minimum = toLovelace(minAmount);
            const lovelace = toLovelace(amountInAda);
            const deposit = 1 / 100 * lovelace;
            const currentDate = new Date();
            const expirationTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + validityInDays);

            const metadata = {
                validityInDays,
                minimum,
                location,
                paymentMethod,
                contactName,
                contactEmail,
                contactPhone,
                amount: lovelace,
                amountInUsd: removeFloat(amountInUsd),
                conversionRate,
                deposit,
                expirationTime: expirationTime.getTime(),
                state: 'locked',
                provider: 'ekival',
            };
            // debugger
            // const tDatum = createTreasuryDatum(address, address,
            //      lovelace, minimum, expirationTime.getTime(), "1", "0")
            const tDatum = createTreasuryDatum(address, address, "800000000", "200000000", "1651025390000", "1", "0")
            const treasuryDatum = serializeTreasuryDatum(tDatum)

            outputs.add(
                createTxOutput(
                    Cardano?.Instance?.Address.from_bech32(treasuryContractAddress),
                    assetsToValue([
                        { unit: "lovelace", quantity: `${deposit}` }
                    ]),
                    { datum: treasuryDatum }
                )
            )


            // @ts-ignore
            const txHash = await finalizeTx({
                txBuilder,
                utxos,
                outputs,
                metadata,
                changeAddress: fromBech32(address),
            })

            resolve({ txHash, metadata })
        }
        catch (error) {
            console.log(error, "in lockingTx")
            reject(error)
        }
    })

};
