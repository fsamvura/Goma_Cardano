import * as R from "react";
import { useLazyQuery, gql } from "@apollo/client";

const TXHASH_QUERY = gql`
  query AddressFromUtxo($txhash: Hash32Hex!) {
    transactions(where: { hash: { _eq: $txhash } }) {
      inputs {
        address
      }
    }
  }
`;

export const useTxAddresses = () => {
    const [txAddresses, setTxAddresses] = R.useState(null);
    const [getTxAddresses, { loading, error }] = useLazyQuery(TXHASH_QUERY, {
        onCompleted: (data) => setTxAddresses(data),
    });

    return { error, loading, txAddresses, getTxAddresses };
};
