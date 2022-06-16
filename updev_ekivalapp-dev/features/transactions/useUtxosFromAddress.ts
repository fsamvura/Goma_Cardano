import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core'
import {
  provideApolloClient,
  useQuery,
} from '@vue/apollo-composable';


const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'https://d.graphql-api.testnet.dandelion.link/',
})

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

export const useUtxosFromAddress = (address:string) => {

  provideApolloClient(apolloClient);
  const result = useQuery(UTXOS_QUERY,{addr:address})

  return result
};
