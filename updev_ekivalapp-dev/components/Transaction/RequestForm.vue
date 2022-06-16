<script lang="ts" setup>
import {
  Dialog,
  DialogTitle,
  DialogPanel,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'
import { useForm } from "vee-validate";
import { useMain } from '@/stores/main'
import { useWallet } from '~/stores/wallet'
import { toLovelace } from "@/utils/converter";
import type { Region } from '@/server/api/regions';
import { showSwalMessage } from '@/utils/ui-utils'
import type { LockFundsData, TransactionLock } from '@/features/transactions/Data'

const emit = defineEmits(['close'])

const props = defineProps({
  modalOpened: Boolean
})

const {
  handleSubmit,
  resetForm,
  setFieldValue,
  values: formValues
} = useForm<LockFundsData>({
  initialValues: {
    amount: null,
    amountInAda: null,
    minAmount: 1,
    validityInDays: 3,
    cityToSend: 1,
    paymentMethod: 'CASH',
    contactName: null,
    contactEmail: null,
    contactPhone: null,
  }
});
const swal = inject("$swal");

const store = useMain()
const wallet = useWallet()
const transaction = useTransaction()

const processing = ref(false)
const regions = ref<Region[]>([])
const paymentMethods = ref([
  {
    id: 'CASH',
    designation: 'CASH',
  },
  {
    id: 'MOBILE',
    designation: 'MOBILE',
    disabled: true
  },
])

const lovelaceAmount = computed(() => toLovelace(formValues.amountInAda as number))

function resetAll(): void {
  emit('close')
  resetForm()
}

async function loadRegions(): Promise<void> {
  if (regions.value.length === 0) {
    const { data } = await useFetch('/api/regions')
    if (data.value.length) {
      regions.value = data.value
    }
  }
}

const lockFunds = async (formData: LockFundsData) => {
  return await transaction.lockFundsInTreasury(formData)
}

// const testCommitingBounty = async () => {
//    const firstTUtxo = tUtxos.value[0]
//   const tUtxo = {tx_hash: firstTUtxo.transaction.hash, output_index: firstTUtxo.index, 
//     amount: [{unit:'lovelace', quantity: firstTUtxo.value}]}
//   const txCommitHash = await transactionService.commit(100000,tUtxo)
//   console.log(txCommitHash)
// }

// const testDistributeBounty = async () => {
//    const firstUtxo = bUtxos.value[0]
//   const utxo = {tx_hash: firstUtxo.transaction.hash, output_index: firstUtxo.index, 
//     amount: [{unit:'lovelace', quantity: firstUtxo.value}]}
//   const txCommitHash = await transactionService.distribute(10000000,utxo)
//   console.log(txCommitHash)
// }

const submitForm = handleSubmit(async (formData) => {
  try {
    processing.value = true
    // @ts-ignore
    const { txHash: hash, metadata } = await lockFunds(formData)

    if (hash) {
      const transaction: TransactionLock = {
        hash,
        includedAt: (new Date()).toISOString(),
        metadata,
        inputs: [],
        outputs: []
      }
      console.log('transaction', transaction);
      store.addTransactionOrder(transaction)
      showSwalMessage('Your transaction have been locked to Ekival', `Hash: ${hash}`)
      resetAll()
    }

    //testCommitingBounty()

    //testDistributeBounty()
  } catch (error) {
    // @ts-ignore
    if (error && error.code === 2) {
      showSwalMessage('Transaction cancelled', 'You have declined to sign the transaction !', 'error')
    } else {
      showSwalMessage('Error', 'Transaction aborted !', 'error')
    }
  } finally {
    processing.value = false
  }
});

watch(() => props.modalOpened, loadRegions)

watch(() => formValues.amount, (val) => {
  if (val && val > 0) {
    setFieldValue('amountInAda', Number.parseFloat((val / wallet.usdRate).toFixed(2)))
    return
  }
  setFieldValue('amountInAda', 0)
})

</script>
<template>
  <TransitionRoot appear :show="modalOpened" as="template">
    <Dialog as="div" @close="resetAll" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-opacity-25 pb-0 bg-black" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="modal w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 pt-4 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg text-center uppercase font-medium leading-6 text-gray-900">
                Fund the Ekival Contract
              </DialogTitle>
              <button @click="resetAll" class="btn btn-sm btn-close absolute right-2 top-2">✕</button>
              <div class="h-[1px] bg-gray-300 w-full mt-2"></div>
              <form class="form-control w-full space-y-2">
                <div class="grid grid-cols-2 gap-2 pt-2">
                  <FormBaseTextInput placeholder="Amount in usd" label="Amount in usd" name="amount"
                    rules="required|min_value:1" class="text-left" type="number">
                    <font-awesome-icon class="w-4 h-4 absolute top-3 right-4" icon="dollar-sign" />
                  </FormBaseTextInput>
                  <FormBaseTextInput placeholder="Value in ADA" label="Value in ADA" name="amountInAda" rules="required"
                    type="number" disabled readonly>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px" y="0px" viewBox="0 0 190 190"
                      style="enable-background:new 0 0 190 190;height: 12px;margin-bottom: 0.2em;margin-left: -4px;"
                      xml:space="preserve" class="inline w-4 h-4 absolute top-3 right-4">
                      <g>
                        <path
                          d="M167.3,109.9c-0.2-3.8-3.6-6.7-7.5-6.7h-21.2l0,0l-5.8-14.7l0,0h13.1c3.8,0,7.3-2.8,7.5-6.7c0.2-4-3-7.3-6.9-7.3h-19.2l0,0
                        l-24-60.5c-1-2.6-3.6-4.4-6.5-4.4c-2.8,0-5.4,1.8-6.5,4.4L67.3,74.4l0,0H48.5c-3.8,0-7.3,2.8-7.5,6.7c-0.2,4,3,7.3,6.9,7.3h13.7
                        l0,0L56,103l0,0H35c-3.8,0-7.3,2.8-7.5,6.7c-0.2,4,3,7.3,6.9,7.3h16.1l0,0l-18.8,48.8c-1.4,3.6,0.4,7.7,4,9.1
                        c0.8,0.4,1.6,0.4,2.4,0.4c2.8,0,5.4-1.6,6.5-4.4l20.8-53.8l0,0h63.3l0,0l21.6,54.4c1,2.8,3.6,4.4,6.5,4.4c0.8,0,1.8-0.2,2.6-0.4
                        c3.6-1.4,5.2-5.4,3.8-9.1l-19.6-49.2l0,0h15.9C164.2,117.1,167.5,113.9,167.3,109.9z M97.1,36.1l15.1,38.3l0,0H82.4l0,0L97.1,36.1
                        C96.9,36.1,97.1,36.1,97.1,36.1z M71.1,103.2l5.6-14.7l0,0h40.7l0,0l5.8,14.7l0,0H71.1L71.1,103.2z" />
                      </g>
                    </svg>
                    <small v-if="lovelaceAmount > 0" class="lovelace-amount">{{ lovelaceAmount }} lovelace</small>
                  </FormBaseTextInput>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <FormBaseTextInput placeholder="Minimum amount" label="Min amount (ADA)" name="minAmount"
                    rules="required|min_value:1" type="number">
                  </FormBaseTextInput>
                  <FormBaseTextInput placeholder="Validity in days" label="Validity in days" name="validityInDays"
                    rules="required|min_value:3" type="number">
                    <span class="inline w-5 h-5 absolute top-2 right-5">/days</span>
                  </FormBaseTextInput>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <FormBaseSelect :options="regions" placeholder="Select the region" label="Region" name="cityToSend"
                    rules="required" />
                  <FormBaseSelect :options="paymentMethods" placeholder="Select the payment method"
                    label="Payment method" name="cityToSend" rules="required" />
                </div>
                <div>
                  <p class="divider line one-line font-bold text-xs">CONTACT INFOS</p>
                  <div class="grid grid-cols-3 gap-2">
                    <FormBaseTextInput placeholder="Contact name" label="Name" name="contactName" rules="required" />
                    <FormBaseTextInput placeholder="Contact email" label="Email" name="contactEmail" type="email"
                      rules="required|email" />
                    <FormBasePhoneInput placeholder="Phone number" name="contactPhone" label="Phone number"
                      rules="required" />
                  </div>
                </div>
                <div class="flex space-x-2 py-3">
                  <FormSubmitButton @click.prevent="submitForm" :processing="processing"
                    class="py-1 normal-case max-w-sm hover:bg-blue-400">
                    Lock
                  </FormSubmitButton>
                  <button @click.prevent="resetAll" class="btn btn-ghost normal-case">Cancel</button>
                </div>
              </form>
            </DialogPanel>

          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<style scoped lang="scss" src="./request-form.scss">
</style>
<style scoped>
.lovelace-amount {
  font-size: 0.7rem;
  font-style: italic;
}
</style>