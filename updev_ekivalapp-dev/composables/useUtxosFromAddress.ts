import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core'
import {
  provideApolloClient,
  useQuery,
} from '@vue/apollo-composable';
import { ref } from 'vue'
import { useMain } from '@/stores/main'
import type { TransactionLock } from '@/features/transactions/Data'
import { isLocked, toTransactionLock } from '@/features/transactions/Services'

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

export const useUtxosFromAddress = () => {

  const store = useMain()

  const loading = ref(false)
  // const transactions = ref<TransactionLock[]>([])
  
  async function loadData (address:string): Promise<void> {
    provideApolloClient(apolloClient);
    try {
      loading.value = true
      const response = useQuery(UTXOS_QUERY,{addr:address})
      response.onResult((result) => {
        const orders: TransactionLock[] = []
        if (result) {
          // @ts-ignore
           result.data.utxos.forEach(async (tx) => {
            const transaction = await toTransactionLock(tx.transaction) as TransactionLock
            if (transaction) {
              orders.push(transaction)
            }
          })
          store.setTransactionOrders(orders)
        }
      })
    } catch (error) {
      console.log('error', error)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    loadData,
    // transactions, 
  }
};
