<script lang="ts" setup>
import { useMain } from '@/stores/main'
import { useWallet } from '@/stores/wallet'
import { showSwalMessage } from '@/utils/ui-utils'
import type { TransactionLock } from '@/features/transactions/Data'

definePageMeta({
  layout: 'page',
  title: 'Orders'
})

const store = useMain()
const wallet = useWallet()

const transactions = computed(() => store.orders)
const connecting = computed(() => wallet.connecting)
const isWalletConnected = computed(() => wallet.isWalletConnected)

// Use this hook to query the Bounty Contract address
const {
  loading,
  loadData,
} = useUtxosFromAddress();

const removeTransactionOrder = (transaction: TransactionLock) => {
  store.removeTransactionOrder(transaction)
  showSwalMessage('Transaction cancelled', 'Your transaction has been cancelled', 'info')
}

watch(isWalletConnected, (val) => {
  if (val) {
    // loadTransactions()
  }
})

watch(loading, (val) => {
  console.log('loading', val)
})

onMounted(() => {
  // console.log('wallet.walletAddress', wallet.walletAddress)
  loadData(wallet.walletAddress as string)
})

</script>

<template>
  <section class="banner-container h-screen relative items-center overflow-hidden ">
    <div v-if="isWalletConnected" class="grid grid-cols-1 text-center justify-items-center">
      <!-- <WalletSearchForm /> -->

      <div class="min-w-full px-2 overflow-x-auto">
        <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Location
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Amount USD
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Amount ADA
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  TYPE OF PAYMENT
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Deadline
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                  <font-awesome-icon v-if="loading" icon="spinner" size="lg" spin />
                  <!-- <RefreshIcon @click="loadTransactions" v-else class="ml-2" title="Refresh" /> -->
                </th>
              </tr>
            </thead>
            <tbody is="transition-group" name="fade-from-right">
              <OrderItem v-for="transaction in transactions" :transaction="transaction" :key="transaction.hash"
                @cancelled="removeTransactionOrder" />
            </tbody>
          </table>
        </div>
      </div>
      <div class="grid md:grid-cols-12 grid-cols-1 mt-8">
        <div class="md:col-span-12 text-center">
          <nav aria-label="Page navigation example">
            <ul class="inline-flex items-center -space-x-px">
              <li>
                <a href="#"
                  class="w-[40px] h-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-l-lg hover:text-white border border-gray-200 dark:border-gray-700 hover:border-primary-600 dark:hover:border-primary-600 hover:bg-primary-600 dark:hover:bg-primary-600">
                  <i class="uil uil-angle-left text-[20px]"></i>
                </a>
              </li>
              <li>
                <a href="#"
                  class="w-[40px] h-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 hover:border-primary-600 dark:hover:border-primary-600 hover:bg-primary-600 dark:hover:bg-primary-600">1</a>
              </li>
              <li>
                <a href="#" aria-current="page"
                  class="z-10 w-[40px] h-[40px] inline-flex justify-center items-center text-white bg-primary-600 border border-primary-600">2</a>
              </li>
              <li>
                <a href="#"
                  class="w-[40px] h-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 hover:border-primary-600 dark:hover:border-primary-600 hover:bg-primary-600 dark:hover:bg-primary-600">3</a>
              </li>
              <li>
                <a href="#"
                  class="w-[40px] h-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-r-lg hover:text-white border border-gray-200 dark:border-gray-700 hover:border-primary-600 dark:hover:border-primary-600 hover:bg-primary-600 dark:hover:bg-primary-600">
                  <i class="uil uil-angle-right text-[20px]"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div v-else class="grid grid-cols-1 md:mt-44 mt-32 text-center justify-items-center">
      <AccountAuthBanner />
    </div>

  </section>
</template>