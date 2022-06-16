<script lang="ts" setup>
import { useWallet } from '~/stores/wallet'

definePageMeta({
  layout: 'page',
  title: 'Offres'
})

const walletStore = useWallet()

const connecting = computed(() => walletStore.connecting)
const isWalletConnected = computed(() => walletStore.isWalletConnected)


</script>

<template>
  <section class="banner-container h-screen relative items-center overflow-hidden ">
    <div v-if="isWalletConnected" class="grid grid-cols-1 text-center justify-items-center">
      <WalletSearchForm />

      <div class="min-w-full py-4 px-2 overflow-x-auto">
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
                  Amount
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Min value
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Type of payment
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Deadline
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in 4" :key="i"
                class="hover:bg-gray-100 transition-all duration-500 hover:scale-105 shadow hover:shadow-md ease-in-out">
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    PARIS - GOMA
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">$20,000</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">$10,0</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">CASH</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <!-- <p class="text-gray-900 whitespace-no-wrap">Sept 28, 2019</p> -->
                  <p class="text-gray-600 whitespace-no-wrap">Due in 3 days</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <FormSubmitButton>
                    Commit
                  </FormSubmitButton>
                  <!-- <button class="rounded bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white"> Tailwind</button> -->
                </td>
              </tr>
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
                <a href="#"
                  class="w-[40px] h-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 hover:border-primary-600 dark:hover:border-primary-600 hover:bg-primary-600 dark:hover:bg-primary-600">2</a>
              </li>
              <li>
                <a href="#" aria-current="page"
                  class="z-10 w-[40px] h-[40px] inline-flex justify-center items-center text-white bg-primary-600 border border-primary-600">3</a>
              </li>
              <li>
                <a href="#"
                  class="w-[40px] h-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 hover:border-primary-600 dark:hover:border-primary-600 hover:bg-primary-600 dark:hover:bg-primary-600">4</a>
              </li>
              <li>
                <a href="#"
                  class="w-[40px] h-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 hover:border-primary-600 dark:hover:border-primary-600 hover:bg-primary-600 dark:hover:bg-primary-600">5</a>
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
