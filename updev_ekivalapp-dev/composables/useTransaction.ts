import gql from 'graphql-tag'
import { useWallet } from '~/stores/wallet'
// import { useQuery } from '@vue/apollo-composable'
import type { LockFundsData } from '@/features/transactions/Data'
import { lockingTx } from "@/modules/cardano/locking-tx"

export const useTransaction = () => {

  const walletStore = useWallet()
  const provider = 'ekival'
  
  const loadTransactionOffers = () => {

  const TRANSACTIONS_QUERY = gql`
    query AddressTransactions($addr : String!) {
      transactions(where: { metadata: { value: { provider: { _eq : $provider } } }}) {
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
    return useQuery(TRANSACTIONS_QUERY,{ provider });
  }
  
  const getTxsFromAddress = (addr: string | null) => {

  if (addr === null) return null

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
    return useQuery(TRANSACTIONS_QUERY,{ addr });
  }

async function lockFundsInTreasury(data:LockFundsData) {
  return new Promise(async (resolve, reject) => {
    try {
      const treasuryLockParams = {
        address: walletStore.walletAddress,
        utxosParam: walletStore.walletUtxos,
        amountInUsd: data.amount,
        amountInAda: data.amountInAda,
        minAmount: data.minAmount,
        validityInDays: data.validityInDays,
        location: data.cityToSend,
        paymentMethod: data.paymentMethod,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
      }
      const response = await lockingTx(treasuryLockParams)
      
      resolve(response)
      // return txHash;
    } catch (error) {
      reject(error)
    }
  })
}


  return {
    getTxsFromAddress,
    lockFundsInTreasury
  }
}
