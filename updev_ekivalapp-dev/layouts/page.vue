<script lang="ts" setup>
import { useWallet } from '~/stores/wallet'
import { openModal } from '~/utils/ui-utils'
import { transactions, notifications } from '@/features/transactions/Data'


useHead({
  titleTemplate: 'EKIVAL - %s',
  // or, instead:
  // titleTemplate: (title) => `EKIVAL - ${title}`,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
})
const wallet = useWallet()
const walletCookie = useCookie('wallet')

const requestModalOpened = ref(false)
const refreshing = ref(false)
const lastNotifications = ref(notifications)

const connecting = computed(() => wallet.connecting)
const actualBalance = computed(() => wallet.actualBalance)
const isWalletConnected = computed(() => wallet.isWalletConnected)

const connect = (val: boolean) => {
  wallet.toggleModal(val)
}

const addtransaction = () => {
  // openModal(createModal.value)
  //@ts-ignore
  // document.querySelector(`#${createModal.value}`).modal('show')
  requestModalOpened.value = true
}

const refreshBalance = async () => {
  try {
    refreshing.value = true
    await wallet.refreshBalance()
  } catch (error) {
    console.log('e', error)
  } finally {
    refreshing.value = false
  }

}



onMounted(async () => {
  if (walletCookie.value) {
    await wallet.connectToWallet(walletCookie.value)
    await wallet.refreshBalance()
  } else {
  }
  await wallet.loadAvailableWallets()
})

</script>
<template>
  <div class="bg-primary-600/5 page-content">
    <!-- <div id="preloader">
      <div id="status">
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
      </div>
    </div> -->
    <nav id="topnav" class="defaultscroll is-sticky z-3 bg-white">
      <div class="container px-0">
        <!-- Logo container-->

        <Anchor to="/" class="logo">
          <img src="~/assets/images/logo-dark.png" class="inline-block dark:hidden h-10 md:h-20" alt="">
          <img src="~/assets/images/logo-light.png" class="hidden dark:inline-block h-10 md:h-20" alt="">
        </Anchor>

        <!-- End Logo container-->
        <div class="menu-extras">
          <div class="menu-item">
            <!-- Mobile menu toggle-->
            <a class="navbar-toggle" id="isToggle" onclick="toggleMenu()">
              <div class="lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </a>
            <!-- End mobile menu toggle-->
          </div>
        </div>

        <!--Login button Start-->
        <ul class="buy-button list-none mb-0 flex">
          <li class="inline mb-0 hidden-xs">
            <div class="flex space-x-4 border-l ml-6 pl-6 border-gray-900/10 dark:border-gray-50/[0.2]">
              <LanguageSwitcher />
              <!-- <ThemeToggle /> -->
            </div>

          </li>

          <li class="inline pl-1 mb-0 ml-2">
            <AccountProfileButton v-if="isWalletConnected" />
            <FormSubmitButton v-else :rounded="true" :processing="connecting" @click="connect(true)">
              {{ $t('wallet.connect') }}
            </FormSubmitButton>
          </li>
        </ul>
        <!--Login button End-->

        <div id="navigation">
          <!-- Navigation Menu-->
          <ul class="navigation-menu justify-content-start">
            <li>
              <Anchor class="sub-menu-item" to="/">
                HOME
              </Anchor>
            </li>
            <li>

              <Anchor class="sub-menu-item" to="/offers">
                Offers
              </Anchor>
            </li>
            <li>
              <Anchor class="sub-menu-item" to="/orders">
                My Orders
              </Anchor>
            </li>
          </ul>
          <!--end navigation menu-->
        </div>
        <!--end navigation-->
      </div>
      <!--end container-->
    </nav>
    <div class="container body-container px-0">
      <div class="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
        <div :class="[isWalletConnected ? 'lg:col-span-8 md:col-span-6' : 'lg:col-span-12']">
          <slot />
        </div>
        <div class="lg:col-span-4 md:col-span-6" v-if="isWalletConnected">
          <div class="sticky top-20">
            <div class="relative flex justify-between py-4 px-2 pb-6 rounded-md text-gray-50 text-sm bg-primary">
              <div>
                <p class="font-medium">Mes demandes</p>
                <p class="text-lg font-semibold">5000$</p>
              </div>
              <div class="flex flex-col items-end">
                <p class="font-medium">En cours</p>
                <p class="text-lg font-semibold">3000$</p>
              </div>
              <div
                class="text-primary bg-white absolute -bottom-14 py-2 w-[95%] px-2 rounded-md flex items-center justify-around shadow">
                <div>
                  <div class="flex space-x-1">
                    <p>Wallet Balance</p>
                  </div>
                  <div class="flex space-x-1 items-center justify-between">
                    <p class="text-md font-semibold">{{ actualBalance }} Ada</p>
                    <button @click="refreshBalance" class="text-gray-500 hover:text-primary">
                      <font-awesome-icon v-if="refreshing" icon="spinner" spin />
                      <RefreshIcon v-else />
                    </button>
                  </div>
                </div>
                <div class="h-10 w-[1px] bg-primary"></div>
                <label @click="addtransaction" for="new-payment-modal"
                  class="btn-disabled disabled modal-button flex flex-col items-center space-x-1 px-6 py-2 rounded border border-gray-50 hover:border-primary hover:cursor-pointer">
                  <svg class="h-5 fill-current" viewBox="0 0 26 26">
                    <path
                      d="M7 0C4.796875 0 3 1.796875 3 4L3 22C3 24.203125 4.796875 26 7 26L14.71875 26C14.070313 25.429688 13.53125 24.753906 13.09375 24L7 24C5.894531 24 5 23.105469 5 22L5 4C5 2.894531 5.894531 2 7 2L14.28125 2C15.003906 2.183594 15 3.050781 15 3.9375L15 7C15 7.550781 15.449219 8 16 8L19 8C19.996094 8 21 8.003906 21 9L21 12.0625C21.699219 12.148438 22.367188 12.335938 23 12.59375L23 8C23 6.9375 22.027344 5.929688 20.28125 4.21875C20.039063 3.980469 19.777344 3.714844 19.53125 3.46875C19.285156 3.222656 19.019531 2.992188 18.78125 2.75C17.070313 1.003906 16.0625 0 15 0 Z M 7.8125 10C7.261719 10.050781 6.855469 10.542969 6.90625 11.09375C6.957031 11.644531 7.449219 12.050781 8 12L18 12C18.359375 12.003906 18.695313 11.816406 18.878906 11.503906C19.058594 11.191406 19.058594 10.808594 18.878906 10.496094C18.695313 10.183594 18.359375 9.996094 18 10L8 10C7.96875 10 7.9375 10 7.90625 10C7.875 10 7.84375 10 7.8125 10 Z M 8 14C7.449219 14 7 14.445313 7 15C7 15.554688 7.449219 16 8 16L13.09375 16C13.53125 15.246094 14.070313 14.570313 14.71875 14 Z M 20 14C16.6875 14 14 16.6875 14 20C14 23.3125 16.6875 26 20 26C23.3125 26 26 23.3125 26 20C26 16.6875 23.3125 14 20 14 Z M 19 16L21 16L21 19L24 19L24 21L21 21L21 24L19 24L19 21L16 21L16 19L19 19 Z M 8 18C7.449219 18 7 18.445313 7 19C7 19.554688 7.449219 20 8 20L12 20C12 19.308594 12.085938 18.640625 12.25 18Z" />
                  </svg>
                  <p>Nouveau</p>
                </label>
              </div>
            </div>
            <!-- <div class="space-y-2">
              <div class="flex items-center space-x-1">
                <h2 class="text-gray-800 font-medium">Notifications récentes</h2>
                <svg class="text-gray-600 fill-current h-4" viewBox="0 0 50 50">
                  <path
                    d="M25 2C12.308594 2 2 12.308594 2 25C2 37.691406 12.308594 48 25 48C37.691406 48 48 37.691406 48 25C48 12.308594 37.691406 2 25 2 Z M 25 4C36.609375 4 46 13.390625 46 25C46 36.609375 36.609375 46 25 46C13.390625 46 4 36.609375 4 25C4 13.390625 13.390625 4 25 4 Z M 32.980469 15.988281C32.941406 15.992188 32.90625 15.996094 32.871094 16L21.6875 16C21.324219 15.996094 20.988281 16.183594 20.808594 16.496094C20.625 16.808594 20.625 17.191406 20.808594 17.503906C20.988281 17.816406 21.324219 18.003906 21.6875 18L30.585938 18L16.292969 32.292969C16.03125 32.542969 15.925781 32.917969 16.019531 33.265625C16.109375 33.617188 16.382813 33.890625 16.734375 33.980469C17.082031 34.074219 17.457031 33.96875 17.707031 33.707031L32 19.414063L32 28.3125C31.996094 28.675781 32.183594 29.011719 32.496094 29.191406C32.808594 29.375 33.191406 29.375 33.503906 29.191406C33.816406 29.011719 34.003906 28.675781 34 28.3125L34 17.125C34.039063 16.835938 33.949219 16.542969 33.753906 16.320313C33.558594 16.101563 33.273438 15.980469 32.980469 15.988281Z" />
                </svg>
              </div>
              <div class="flex items-center overflow-x-auto space-x-2 no-scrollbar">
                <TransactionNotificationCard v-for="item in lastNotifications" :key="item.source"
                  :notification="item" />
              </div>
            </div> -->
          </div>
        </div>
      </div>

    </div>
    <!-- <div class="md:flex justify-center mt-10">
      <div class="lg:w-1/2 md:w-2/3">
        <img src="/images/illustrator/celebration.svg" class="mx-auto" alt="">
      </div>
    </div>
    <div class="relative">
      <div class="shape marketing-hero overflow-hidden z-1 text-white"></div>
    </div> -->
    <ClientOnly>
      <WalletPickerModal />
      <TransactionRequestForm @close="requestModalOpened = false" :modal-opened="requestModalOpened" />
      <!-- <div class="fixed top-1/4 -right-1 z-3">
        <span class="relative inline-block rotate-90">
          <input type="checkbox" class="checkbox opacity-0 absolute" id="chk" />
          <label
            class="label bg-slate-900 dark:bg-white shadow dark:shadow-gray-700 cursor-pointer rounded-full flex justify-between items-center p-1 w-14 h-8"
            for="chk">
            <i class="uil uil-moon text-[20px] text-warning-500"></i>
            <i class="uil uil-sun text-[20px] text-warning-500"></i>
            <span class="ball bg-white dark:bg-slate-900 rounded-full absolute top-[2px] left-[2px] w-7 h-7"></span>
          </label>
        </span>
      </div>  -->
    </ClientOnly>
  </div>
</template>
<style scoped>
.logo {
  line-height: 55px;
}

#topnav .buy-button {
  padding-bottom: 18px;
  padding-top: 18px;
}

#topnav .navigation-menu>li>a.router-link-exact-active,
#topnav .navigation-menu>li:hover>a {
  color: #06a5fa !important;
}

.container {
  max-width: 1200px !important;
}

.page-content {
  background: url('/images/home-shape.png') center center;
}

.body-container {
  padding-top: 6.5rem !important;
  padding-bottom: 6.5rem !important;
}

.top-20 {
  top: 6.5rem !important;
}
</style>