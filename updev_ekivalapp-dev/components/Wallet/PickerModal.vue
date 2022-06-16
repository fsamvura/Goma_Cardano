<script lang="ts" setup>
import { typewrite } from "@/utils/typed.init.js";
import {
  Dialog,
  RadioGroup,
  DialogTitle,
  DialogPanel,
  TransitionRoot,
  TransitionChild,
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupDescription
} from '@headlessui/vue'
import { useWallet } from '~/stores/wallet'
import type { WalletType } from '~/stores/wallet'
import { notify } from "@kyvg/vue3-notification";

const wallet = useWallet()
const walletCookie = useCookie('wallet')

const selectedWallet = ref<WalletType | null>(null)

const isOpen = computed(() => wallet.isModalOpened)
const cardanoWallets = computed(() => wallet.cardanoWallets)
const availableWallets = computed(() => wallet.availableWallets)
const connecting = computed(() => wallet.connecting)
const currentWallet = computed(() => wallet.currentWallet)
const formattedAddress = computed(() => wallet.formattedAddress)
const isWalletConnected = computed(() => wallet.isWalletConnected)

const isAvailable = (val: WalletType) => {
  return availableWallets.value.includes(val)
}

const toggleModal = (val: boolean) => {
  wallet.toggleModal(val)
  selectedWallet.value = null
}

watch(selectedWallet, (val) => {
  if (val) {
    wallet.currentWallet = val
    walletCookie.value = val
    wallet.connectToWallet(val)
  }
})

watch(isWalletConnected, (connected) => {
  if (connected === true) {
    notify({
      title: `${currentWallet.value} - wallet connected`,
      text: `Adress - ${formattedAddress.value}!`,
    });
    toggleModal(false)
  }
  // console.log('isWalletConnected', val)
})

</script>
<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="toggleModal(false)" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-opacity-25 pb-0 backdrop-blur-sm backdrop-opacity-90 backdrop-filter" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg text-center uppercase font-medium leading-6 text-gray-900">
                {{ $t('wallet.pick') }}
              </DialogTitle>
              <div class="w-full px-4 py-8">
                <div class="mx-auto w-full max-w-md">
                  <RadioGroup v-model="selectedWallet">
                    <RadioGroupLabel class="sr-only">Wallet name</RadioGroupLabel>
                    <div class="space-y-2">
                      <RadioGroupOption as="template" v-for="walletName in cardanoWallets" :key="walletName"
                        :value="walletName" :disabled="!isAvailable(walletName)" v-slot="{ active, checked }">
                        <div :class="[
                          isAvailable(walletName)
                            ? 'cursor-pointer'
                            : 'bg-light-900',
                          active
                            ? 'border-blue-400 ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                            : '',
                          checked ? 'border-blue-400 bg-opacity-75 ' : 'bg-white ',
                        ]" class="relative flex rounded-lg px-5 py-4 shadow-md focus:outline-none">
                          <div class="flex w-full items-center justify-between">
                            <div class="flex items-center">
                              <img :src="`/images/wallets/${walletName}.svg`"
                                class="wallet-icon max-w-full h-auto rounded-full " :alt="walletName">
                              <div class="text-lg ml-3">
                                <RadioGroupLabel as="p" class="text-blue-400 font-medium capitalize">
                                  {{ walletName }}
                                </RadioGroupLabel>
                                <RadioGroupDescription as="span" class="wallet-status block text-xs text-gray-500">
                                  {{ isAvailable(walletName) ? $t('wallet.available') : $t('wallet.not_available') }}
                                </RadioGroupDescription>
                              </div>
                            </div>
                            <Spinner v-if="connecting && checked" />
                            <div v-show="checked && !connecting" class="shrink-0 text-blue-400">
                              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="12" fill="#60A5FA" fill-opacity="0.2" />
                                <path d="M7 13l3 3 7-7" stroke="#60A5FA" stroke-width="1.5" stroke-linecap="round"
                                  stroke-linejoin="round" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </RadioGroupOption>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </DialogPanel>

          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<style scoped>
.wallet-icon {
  max-width: 30px;
}

.wallet-status {
  width: 100px;
}

.bg-light-900 {
  background-color: #f2f2f2 !important;
}
</style>