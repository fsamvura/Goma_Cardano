<script lang="ts" setup>
import { typewrite } from "@/utils/typed.init.js";
import { useWallet } from '~/stores/wallet'

definePageMeta({
  layout: 'page',
  title: 'Acceuil'
})

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
  <div class="h-screen">
    <section class="banner-container h-screen relative items-center overflow-hidden ">
      <div v-if="isWalletConnected" class="grid grid-cols-1 justify-items-center">
        <HomeBanner />
      </div>
      <div v-else class="grid grid-cols-1 md:mt-44 mt-32 text-center justify-items-center">
        <AccountAuthBanner />
      </div>
    </section>
  </div>
</template>


<style scoped>
</style>
