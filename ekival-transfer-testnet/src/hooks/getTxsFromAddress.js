import * as R from "react";
import { useLazyQuery, gql } from "@apollo/client";

const TRANSACTIONS_QUERY = gql`
  query AddressTransactions($addr : String!) {
    transactions(where: { inputs : { address : { _eq : $addr}}}) {
      hash
      includedAt
      inputs {
        address
      }
      outputs {
        address
        value
        tokens {
          asset {
            policyId
            name
          }
          quantity
        }
      }
      metadata {
        key
        value
      }
    }
  }
`;

export const getTxsFromAddress = () => {
  const [txs, setTxs] = R.useState(null);
  const [getTxs, { loading, error }] = useLazyQuery(TRANSACTIONS_QUERY, {
    onCompleted: (data) => setTxs(data),
  });

  return { error, loading, txs, getTxs };
};
