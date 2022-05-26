import * as R from "react";
import { useLazyQuery, gql } from "@apollo/client";

const UTXOS_QUERY = gql`
  query SmartContractUtxos($addr: String!) {
    utxos(where: { address: { _eq: $addr } }) {
      address
      index
      value
      transaction {
        hash
        includedAt
        metadata {
          key
          value
        }
      }
      tokens {
        quantity
        asset {
          policyId
          assetId
          assetName
        }
      }
    }
  }
`;

export const useUtxosFromAddress = () => {
  const [utxos, setUtxos] = R.useState(null);
  const [getUtxos, { loading, error }] = useLazyQuery(UTXOS_QUERY, {
    onCompleted: (data) => setUtxos(data),
  });

  return { error, loading, utxos, getUtxos };
};
