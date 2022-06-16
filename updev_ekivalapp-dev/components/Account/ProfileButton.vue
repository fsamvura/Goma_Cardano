<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useWallet } from '~/stores/wallet'

const wallet = useWallet()
const walletCookie = useCookie('wallet')

const usdBalance = computed(() => wallet.usdBalance)
const actualBalance = computed(() => wallet.actualBalance)
const currentWallet = computed(() => wallet.currentWallet)
const formattedAddress = computed(() => wallet.formattedAddress)

function logout() {
  wallet.disconnect()
  walletCookie.value = null
}

</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
        <div class="mr-2 pr-2 border-right font-bold">

          <span>
            Balance :
            {{ `${actualBalance}` }}
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
              y="0px" viewBox="0 0 190 190"
              style="enable-background:new 0 0 190 190;height: 12px;margin-bottom: 0.2em;margin-left: -4px;"
              xml:space="preserve" class="inline">
              <g>
                <path d="M167.3,109.9c-0.2-3.8-3.6-6.7-7.5-6.7h-21.2l0,0l-5.8-14.7l0,0h13.1c3.8,0,7.3-2.8,7.5-6.7c0.2-4-3-7.3-6.9-7.3h-19.2l0,0
              l-24-60.5c-1-2.6-3.6-4.4-6.5-4.4c-2.8,0-5.4,1.8-6.5,4.4L67.3,74.4l0,0H48.5c-3.8,0-7.3,2.8-7.5,6.7c-0.2,4,3,7.3,6.9,7.3h13.7
              l0,0L56,103l0,0H35c-3.8,0-7.3,2.8-7.5,6.7c-0.2,4,3,7.3,6.9,7.3h16.1l0,0l-18.8,48.8c-1.4,3.6,0.4,7.7,4,9.1
              c0.8,0.4,1.6,0.4,2.4,0.4c2.8,0,5.4-1.6,6.5-4.4l20.8-53.8l0,0h63.3l0,0l21.6,54.4c1,2.8,3.6,4.4,6.5,4.4c0.8,0,1.8-0.2,2.6-0.4
              c3.6-1.4,5.2-5.4,3.8-9.1l-19.6-49.2l0,0h15.9C164.2,117.1,167.5,113.9,167.3,109.9z M97.1,36.1l15.1,38.3l0,0H82.4l0,0L97.1,36.1
              C96.9,36.1,97.1,36.1,97.1,36.1z M71.1,103.2l5.6-14.7l0,0h40.7l0,0l5.8,14.7l0,0H71.1L71.1,103.2z" />
              </g>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
              class="mx-1 mb-1 h-3 w-3 inline transition duration-150 ease-in-out" data-v-46d99a24="">
              <path
                d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z">
              </path>
            </svg>
            <span title="Equivalent en dollars">
              {{ `${usdBalance} $` }}
            </span>
          </span>
        </div>
        <span class="mr-1">
          {{ formattedAddress }}
        </span>
        <span class="">
          <img :src="`/images/wallets/${currentWallet}.svg`" class="wallet-img" />
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
          class="-mr-1 ml-2 h-5 w-5" data-v-46d99a24="">
          <path fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
        </svg>
      </MenuButton>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems
        class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="py-1">
          <MenuItem v-slot="{ active }">
          <a href="#"
            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Account
            settings</a>
          </MenuItem>
          <form method="POST" action="#">
            <MenuItem v-slot="{ active }">
            <button @click.prevent="logout" type="submit"
              :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full text-left px-4 py-2 text-sm']">Sign
              out</button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
<style scoped>
.wallet-img {
  width: 15px;
  height: 15px;
}

.pr-2 {
  padding-right: .5rem !important
}

.w-288 {
  width: 288px;
}
</style>