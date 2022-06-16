import Cardano from "../serialization-lib";
// we can use the same Datum builder that we used when unlocking the Treasury Contract
import { serializeBountyDatum } from "../treasury-contract/datums";
import {
  assetsToValue,
  createTxOutput,
  createTxUnspentOutput,
  finalizeTx,
  initializeTx,
} from "../transaction";
import { fromBech32, toHex, fromHex } from "@/utils/converter";
import { CANCEL, serializeBountyRedeemer } from "./redeemers";
import { contractScripts } from "./validator";
import { ekivalAddress, treasuryContractAddress } from "../treasury-contract";


// --tx-in $ISSUERTXIN \ -- this is taken care of by our wallet
// --tx-in $BOUNTYTXIN \ -- TODO #1 below
// --tx-in-script-file bounty-play-testnet.plutus \ -- Is ready, needs to be added
// --tx-in-datum-file datum-play-test3.json \
// --tx-in-redeemer-file distribute.json \
// --tx-in-collateral $COLLATERAL \
// --tx-out $CONTRIBUTOR+"12000000 + 1 3794c001b97da7a47823ad27b29e049985a9a97f8aa6908429180e2c.506c7574757350424c436f757273653031 + 51 cef5bfce1ff3fc5b128296dd0aa87e075a8ee8833057230c192c4059.706c6179" \
// --change-address $SENDER \
// --required-signer /home/james/hd2/monday/payment.skey \
// --protocol-params-file protocol.json \
// --out-file unlock.raw

// To Do:
// 1. How is contract utxo passed to Treasury Tx? DONE
// 2. Add plutus contract to this transaction builder DONE
// 3. Build and pass the datum DONE
// 4. Brings us back to Redeemer todos (see notebook) --- in THIS FILE, the ACTION is inherent to the distributeBounty function
// 5. May need to explore required-signer?
// 6. Dynamically get the "unit" for any Access Token

export const distributeBounty = async (bUtxo, bDatum, { issuerAddress, contributorAddress, utxosParam, slug, lovelace }) => {
  try {
    const { txBuilder, datums, outputs } = initializeTx();
    const utxos = utxosParam.map((utxo) =>
      Cardano.Instance.TransactionUnspentOutput.from_bytes(fromHex(utxo))
    );
    // Create funds to provider and paying fees
    const fLovelace = lovelace - 3000000
    const eLovelace = 3000000
    console.log("TRANSFER DATUM", bDatum)

    const bountyDatum = serializeBountyDatum(bDatum)
    datums.add(bountyDatum)
    console.log("what is this bountyDatum?", bountyDatum)



    console.log("Do these addresses look right?", issuerAddress, contributorAddress, ekivalAddress)

    outputs.add(
      createTxOutput(
        Cardano.Instance.Address.from_bech32(contributorAddress),
        assetsToValue([
          { unit: "lovelace", quantity: `${fLovelace}` },

        ])
      )
    )
    outputs.add(
      createTxOutput(
        Cardano.Instance.Address.from_bech32(ekivalAddress),
        assetsToValue([
          { unit: "lovelace", quantity: `${eLovelace}` },

        ])
      )
    )

    console.log("we get this far", treasuryContractAddress)

    const bountyUtxo = createTxUnspentOutput(Cardano.Instance.Address.from_bech32(treasuryContractAddress), bUtxo)
    console.log("Unlocking Bounty", bountyUtxo)

    const address = fromBech32(issuerAddress)
    console.log("TRACING", issuerAddress)

    const requiredSigners = Cardano.Instance.Ed25519KeyHashes.new();
    requiredSigners.add(address.payment_cred().to_keyhash());
    txBuilder.set_required_signers(requiredSigners);


    // just logging
    console.log("txBuilder", txBuilder)

    console.log("BOUNTY CONTRACT SCRIPTS", contractScripts())

    // Lets turn that memo into bonafide metadata

    // Then let's see about attaching gimbals to a transaction
    // How to deal with units on Gimbals (6 decimals)



    const txHash = await finalizeTx({
      txBuilder,
      datums,
      utxos,
      outputs,
      changeAddress: fromBech32(issuerAddress),
      metadata: slug,
      scriptUtxo: bountyUtxo,
      action: CANCEL,
      plutusScripts: contractScripts(),
    })

    console.log("see?")

    return {
      txHash,
    };
  }
  catch (error) {
    console.log(error, "in lockingTx")
  }


};