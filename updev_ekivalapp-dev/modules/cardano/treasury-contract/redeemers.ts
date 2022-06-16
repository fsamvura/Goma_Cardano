import Cardano from '@/modules/cardano/serialization-lib'
import { fromHex, toHex, fromStr } from '@/utils/converter'

export const serializeTreasuryRedeemer = (
  index,
  { issuer, contributor, lovelaceAmount, tokenAmount, expirationTime }
) => {
  console.log('enter redeemer')
  const fields = Cardano.Instance.PlutusList.new()

  fields.add(Cardano.Instance.PlutusData.new_bytes(fromHex(issuer)))
  fields.add(Cardano.Instance.PlutusData.new_bytes(contributor))
  fields.add(
    Cardano.Instance.PlutusData.new_integer(
      Cardano.Instance.BigInt.from_str(`${lovelaceAmount}`)
    )
  )
  fields.add(
    Cardano.Instance.PlutusData.new_integer(
      Cardano.Instance.BigInt.from_str(`${tokenAmount}`)
    )
  )
  fields.add(
    Cardano.Instance.PlutusData.new_integer(
      Cardano.Instance.BigInt.from_str(`${expirationTime}`)
    )
  )

  const data = Cardano.Instance.PlutusData.new_constr_plutus_data(
    Cardano.Instance.ConstrPlutusData.new(
      Cardano.Instance.Int.new_i32(0),
      fields
    )
  )

  const redeemer = Cardano.Instance.Redeemer.new(
    Cardano.Instance.RedeemerTag.new_spend(),
    Cardano.Instance.BigNum.from_str(index), // this index will match the TxIx of the Treasury UTXO; see changes to finalizeTx()
    data,
    Cardano.Instance.ExUnits.new(
      Cardano.Instance.BigNum.from_str('7000000'),
      Cardano.Instance.BigNum.from_str('3000000000')
    )
  )

  return redeemer
}
