<template>
  <div class=" min-w-[23rem] w-full flex space-x-2 bg-gray-50 px-2 py-3 rounded-md shadow">
    <div v-if="item.status == 'pending'"
      class="px-2 py-1 bg-yellow-200/50 rounded w-10 h-10 text-yellow-600/90 flex items-center justify-center">
      <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
          fill="currentColor" />
        <path d="M12.5 7H11V13L15 17L12.5 13.5V7Z" fill="currentColor" />
      </svg>
    </div>
    <div v-else
      class="px-2 py-1 bg-ekival-green-200/50 rounded w-10 h-10 text-ekival-green-600/90 flex items-center justify-center">
      <svg class="h-6 w-6" viewBox="0 0 50 50">
        <path
          d="M25,2C12.318,2,2,12.318,2,25c0,12.683,10.318,23,23,23c12.683,0,23-10.317,23-23C48,12.318,37.683,2,25,2z M35.827,16.562L24.316,33.525l-8.997-8.349c-0.405-0.375-0.429-1.008-0.053-1.413c0.375-0.406,1.009-0.428,1.413-0.053l7.29,6.764l10.203-15.036c0.311-0.457,0.933-0.575,1.389-0.266C36.019,15.482,36.138,16.104,35.827,16.562z"
          fill="currentColor" />
      </svg>
    </div>
    <div class="space-y-1">
      <h2 v-if="item.status == 'pending'" class="font-semibold text-sm text-gray-700">Transaction en attente de
        validation</h2>
      <h2 v-else class="font-semibold text-gray-700 text-sm">Transaction réussie(Terminé)</h2>
      <div class="flex text-gray-500 space-x-2">
        <div class="flex">
          <h2>{{ item.source }}</h2>
          <p>-</p>
          <h2>{{ item.destination }}</h2>
        </div>
        <p>|</p>
        <h2>{{ item.amountInUsd }}$</h2>
      </div>
      <p class="text-sm">{{ item.date.toDateString() }}({{ item.date.toLocaleTimeString() }})</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { Notification } from '@/features/transactions/Data'

const props = defineProps({
  notification: { required: true }
})
const item = ref<Notification>(props.notification as Notification)
</script>