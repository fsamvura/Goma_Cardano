import Cardano from '@/modules/cardano/serialization-lib'
import { serializeBountyDatum, serializeTreasuryDatum } from './datums'
import {
  assetsToValue,
  createTxOutput,
  createTxUnspentOutput,
  finalizeTx,
  initializeTx,
} from '../transaction'
import { fromHex } from '@/utils/converter'
import { contractScripts } from './validator'

// Project Instance Variables:
export const treasuryIssuerAddress =
  'addr_test1qzwx3dj9tk48j82khgd9cvlme83seysyr9r6wn4cykyuhea7q3uj3jrwuy3th9de36ncayrph3gwjg4d62q8k42adgxs799sdx'
export const ekivalAddress =
  'addr_test1qzwx3dj9tk48j82khgd9cvlme83seysyr9r6wn4cykyuhea7q3uj3jrwuy3th9de36ncayrph3gwjg4d62q8k42adgxs799sdx'
export const transferProviderAddress =
  'addr_test1qzwx3dj9tk48j82khgd9cvlme83seysyr9r6wn4cykyuhea7q3uj3jrwuy3th9de36ncayrph3gwjg4d62q8k42adgxs799sdx'
export const treasuryContractAddress =
  'addr_test1wzrdejd58gvgjrn9j9c6899djlrmg0n3x3cqmutxgt5xgychj4jtl'
//"addr_test1wrqwnv5e9warvfv2e5emygj277zqecmlyyuuqnvuak8m9mc3t93px"
export const bountyContractAddress =
  'addr_test1wzwtgddftrnjxuvcz5mm27ch3ymdd4qmr77ce5gefa4gq9q9xuqsw'

export const commitToBounty = async (
  bDatum,
  tDatum,
  {
    contributorAddress,
    utxosParam,
    bountySlug,
    bAda,
    bGimbals,
    tUtxo,
    tLovelaceIn,
    tGimbalsIn,
  }
) => {
  try {
    const { txBuilder, datums, outputs } = initializeTx()
    const utxos = utxosParam.map((utxo) =>
      Cardano.Instance.TransactionUnspentOutput.from_bytes(fromHex(utxo))
    )

    // Convert bAda to Lovelace
    const bLovelace = bAda * 1000000

    // do some quick arithmetic: the Treasury Contract output should contain all of the Lovelace and Gimbals that are NOT sent to the bounty.
    // (In order to unlock funds from the Treasury, The Treasury Validator will insist on meeting this condition.)
    const tLI = parseInt(tLovelaceIn)
    const tGI = parseInt(tGimbalsIn)
    const lovelaceToTreasury = tLI - bLovelace
    const gimbalsToTreasury = tGI - bGimbals

    console.log('bounty bound:', bLovelace, bGimbals)
    console.log(bountyContractAddress)

    const bountyDatum = serializeBountyDatum(bDatum)
    console.log('serialized bountyDatum', bountyDatum)

    const treasuryDatum = serializeTreasuryDatum(tDatum)
    datums.add(treasuryDatum)

    const dataForRedeemer = {
      issuer: treasuryIssuerAddress,
      contributor: contributorAddress,
      lovelaceAmount: bLovelace,
      tokenAmount: bGimbals,
      expirationTime: '1000000000',
    }

    // 4-17 -- why are inputs exhausted?

    // Output to Bounty Contract

    // TODO: The Unit string for the Access token must by dynamic
    outputs.add(
      createTxOutput(
        Cardano.Instance.Address.from_bech32(bountyContractAddress),
        assetsToValue([
          { unit: 'lovelace', quantity: `${bLovelace}` },
          {
            unit: 'cb4a5cb63378a521cb82bdfacc4a8fd543b22ae19c094b75e13f78537447696d62616c',
            quantity: `${bGimbals}`,
          },
          {
            unit: '5d6b6c332866044b2a8bdd147d92f77e42714986f1cb98cef70e201f67656e7479',
            quantity: '1',
          },
        ]),
        { datum: bountyDatum }
      )
    )

    outputs.add(
      createTxOutput(
        Cardano.Instance.Address.from_bech32(treasuryContractAddress),
        assetsToValue([
          { unit: 'lovelace', quantity: `${lovelaceToTreasury}` },
          {
            unit: 'cb4a5cb63378a521cb82bdfacc4a8fd543b22ae19c094b75e13f78537447696d62616c',
            quantity: `${gimbalsToTreasury}`,
          },
        ]),
        { datum: treasuryDatum }
      )
    )

    const treasuryUtxo = createTxUnspentOutput(
      Cardano.Instance.Address.from_bech32(treasuryContractAddress),
      tUtxo
    )

    const txHash = await finalizeTx({
      txBuilder,
      datums,
      utxos,
      outputs,
      changeAddress: contributorAddress,
      metadata: bountySlug,
      scriptUtxo: treasuryUtxo,
      bountyInfo: dataForRedeemer, // just changed
      plutusScripts: contractScripts(),
    })
    return {
      txHash,
    }
  } catch (error) {
    console.log(error, 'commitToBounty')
  }
}
