import { gql } from "@apollo/client";
import { useQuery } from '@vue/apollo-composable'

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
    const { result, loading, error } = useQuery(TXHASH_QUERY);
    return { error, loading, result };
};
