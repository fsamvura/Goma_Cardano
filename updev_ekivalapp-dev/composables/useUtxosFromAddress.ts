import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core'
import {
  provideApolloClient,
  useQuery,
} from '@vue/apollo-composable';
import { ref } from 'vue'
import { useMain } from '@/stores/main'
import { useWallet } from '~/stores/wallet'
import type { TransactionLock, TransactionUtxo } from '@/features/transactions/Data'
import { toTransactionLock } from '@/features/transactions/Services'

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

const TXHASH_QUERY = gql`
  query AddressFromUtxo($txhash: Hash32Hex!) {
    transactions(where: { hash: { _eq: $txhash } }) {
      inputs {
        address
      }
    }
  }
`;

export const useUtxosFromAddress = () => {

  const store = useMain()
  const walletStore = useWallet()

  const loading = ref(false)
  // const transactions = ref<TransactionLock[]>([])
  
  function getAddressesFromUtxo (txhash:string) {
    return new Promise((resolve, reject) => {
      provideApolloClient(apolloClient);
      const response = useQuery(TXHASH_QUERY, {txhash:txhash})
      response.onResult(({ data }) => resolve(data))
      response.onError(error => reject(error))
    })
  }
  
  async function loadData (address:string): Promise<void> {
    provideApolloClient(apolloClient);
    try {
      
      loading.value = true
      const { result, loading: fetching } = useQuery(UTXOS_QUERY,{addr:address})

      watch(result, (data) => {
        const orders: TransactionUtxo[] = []
        if (data) {
          // @ts-ignore
          data.utxos.forEach(async (tx) => {
            const tmpTx = {...tx}
            // Need to improve typing
            const txAddresses = await getAddressesFromUtxo(tmpTx.transaction.hash)
            const transactionAddresses = txAddresses.transactions[0]?.inputs.map((input) => input.address);

            // check whether the transaction is from the currently connected wallet
            const contributorAddresses = transactionAddresses?.filter((address) => address === walletStore.walletAddress);

            if (contributorAddresses.length > 0) {
              tmpTx.contributorAddress = contributorAddresses[0]
              const transaction = await toTransactionLock(tmpTx.transaction, store.regions) as TransactionLock
              if (transaction) {
                tmpTx.transaction = transaction
                // store.addTransactionOrder(tmpTx)
                orders.push(tmpTx)
              }
            }
          })
          store.setTransactionOrders(orders)
        }
        loading.value = false
      })
      // response.onResult((result) => {

      // })
    } catch (error) {
      console.log('error', error)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    loadData,
    getAddressesFromUtxo,
  }
};
