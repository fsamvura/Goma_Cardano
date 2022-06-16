<script lang="ts" setup>
import { typewrite } from "@/utils/typed.init.js";
import { useWallet } from '~/stores/wallet'

const typedText = ["NFT Marketplace", "Cryptocurrency", "Saas & Software", "IT Solutions", "Corporate Business", "Finance", "Freelancer", "Blockchain", "Enterprise", "Software"]

const walletStore = useWallet()

const connecting = computed(() => walletStore.connecting)
const isWalletConnected = computed(() => walletStore.isWalletConnected)

const connect = (val: boolean) => {
  walletStore.toggleModal(val)
  // wallet.connectToWallet()
}

watch(isWalletConnected, (connected) => {
  if (connected === false) {
    const tm = setTimeout(() => {
      typewrite(typedText)
      clearTimeout(tm)
    }, 1000);
  }
})

onMounted(() => {
  typewrite(typedText)
})

</script>

<template>
  <img src="~/assets/images/logoicon.png" class="h-32" alt="">
  <h4 class="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mt-4">
    Built For
    <span class="typewrite text-blue-400" data-period="2000">
    </span>
  </h4>
  <p class="font-bold lg:leading-normal leading-normal text-3xl mx-auto mb-3">
    {{ $t('wallet.not_connected') }}
  </p>

  <div class="mt-4 pt-2" v-if="isWalletConnected === false">
    <a @click.prevent="connect(true)" href=""
      class="px-6 py-3 border-2 border-blue-400 bg-blue-400 text-light-100 font-medium text-xs leading-tight uppercase rounded-full hover:text-blue-400  hover:bg-white hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
      <template v-if="connecting">
        <span class="mr-1"> Connexion... </span>
        <Spinner />
      </template>
      <span v-else>
        {{ $t('wallet.connect') }}
      </span>
    </a>
  </div>
</template>