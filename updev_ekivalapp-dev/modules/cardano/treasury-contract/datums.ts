import Cardano from '@/modules/cardano/serialization-lib'
import { fromHex, toHex, fromStr } from '@/utils/converter'

export const serializeBountyDatum = ({
  providerAddress,
  funderAddress,
  lovelaceAmount,
  minValue,
  expirationTime,
  serviceType,
  commitStatus,
}) => {
  const fields = Cardano.Instance.PlutusList.new()
  fields.add(Cardano.Instance.PlutusData.new_bytes(providerAddress))
  fields.add(Cardano.Instance.PlutusData.new_bytes(funderAddress))
  fields.add(
    Cardano.Instance.PlutusData.new_integer(
      Cardano.Instance.BigInt.from_str(`${lovelaceAmount}`)
    )
  )
  fields.add(
    Cardano.Instance.PlutusData.new_integer(
      Cardano.Instance.BigInt.from_str(`${minValue}`)
    )
  )
  fields.add(
    Cardano.Instance.PlutusData.new_integer(
      Cardano.Instance.BigInt.from_str(`${expirationTime}`)
    )
  )
  fields.add(
    Cardano.Instance.PlutusData.new_integer(
      Cardano.Instance.BigInt.from_str(`${serviceType}`)
    )
  )
  fields.add(
    Cardano.Instance.PlutusData.new_integer(
      Cardano.Instance.BigInt.from_str(`${commitStatus}`)
    )
  )

  const datum = Cardano.Instance.PlutusData.new_constr_plutus_data(
    Cardano.Instance.ConstrPlutusData.new(
      Cardano.Instance.Int.new_i32(0),
      fields
    )
  )

  return datum
}

export const serializeTreasuryDatum = ({
  providerAddress,
  funderAddress,
  lovelaceAmount,
  minValue,
  expirationTime,
  serviceType,
  commitStatus,
}) => {
  const fields = Cardano.Instance.PlutusList.new()
  fields.add(Cardano.Instance.PlutusData.new_bytes(providerAddress))
  fields.add(Cardano.Instance.PlutusData.new_bytes(funderAddress))
  fields.add(
    Cardano.Instance.PlutusData.new_integer(
      Cardano.Instance.BigInt.from_str(`${lovelaceAmount}`)
    )
  )
  fields.add(
    Cardano.Instance.PlutusData.new_integer(
      Cardano.Instance.BigInt.from_str(`${minValue}`)
    )
  )
  fields.add(
    Cardano.Instance.PlutusData.new_integer(
      Cardano.Instance.BigInt.from_str(`${expirationTime}`)
    )
  )
  fields.add(
    Cardano.Instance.PlutusData.new_integer(
      Cardano.Instance.BigInt.from_str(`${serviceType}`)
    )
  )
  fields.add(
    Cardano.Instance.PlutusData.new_integer(
      Cardano.Instance.BigInt.from_str(`${commitStatus}`)
    )
  )

  const datum = Cardano.Instance.PlutusData.new_constr_plutus_data(
    Cardano.Instance.ConstrPlutusData.new(
      Cardano.Instance.Int.new_i32(0),
      fields
    )
  )

  return datum
}

// Do we need these?
// In Unsigs marketplace, we used deserializeOffer to add metadata as backup to Tx

export const deserializeBounty = (datum) => {
  const details = datum.as_constr_plutus_data().data()

  return {
    issuer: toHex(details.get(0).as_bytes()),
    contributor: toHex(details.get(1).as_bytes()),
    lovelaceAmount: details.get(2).as_integer().to_str(),
    tokenAmount: details.get(3).as_integer().to_str(),
    expirationTime: details.get(4).as_integer().to_str(),
  }
}

export const deserializeTreasury = (datum) => {
  const details = datum.as_constr_plutus_data().data()

  return {
    bountyCount: details.get(0).as_integer().to_str(),
    issuer: toHex(details.get(1).as_bytes()),
  }
}
