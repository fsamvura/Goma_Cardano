<script lang="ts" setup>
import { createBountyDatum } from "@/utils/factory";
import { formatToUsd, fromLovelace } from '@/utils/converter'
import type { TransactionLock } from '@/features/transactions/Data'
import { distributeBounty } from "@/modules/cardano/bounty-contract";

interface Props {
  transaction: TransactionLock
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'cancelled', transaction: TransactionLock): void
}>()

const processing = ref(false)

const handleDistribute = () => {
  try {
    processing.value = true
    const tm = setTimeout(() => {
      processing.value = false
      emit('cancelled', props.transaction)
      clearTimeout(tm)
    }, 3000);
    console.log("removeTransactionOrder", props.transaction)
    // const bDatum = createBountyDatum(contributorAddress, contributorAddress, "800000000", "200000000", "1651025390000", "1", "0")
    //const bDatum = createBountyDatum(connected, treasuryIssuerAddress, lovelace, gimbals, 10000000000)
    // const bUtxo = {
    //     "tx_hash": bountyTxHash,
    //     "output_index": bountyTxIx,
    //     "amount": [
    //         { "unit": "lovelace", "quantity": `${lovelace}` }
    //     ],
    // }
    // console.log("bounty UTXO:", bUtxo)

    // const bountyDistribution = {
    //     issuerAddress: connected,
    //     contributorAddress,
    //     utxosParam: walletUtxos,
    //     slug,
    //     lovelace,

    // }

    // const txHash = await distributeBounty(bUtxo, bDatum, bountyDistribution)
    // console.log("txHash is", txHash)
    // if (txHash.error) throw "there was an error"
    // else {
    //     setSuccessfulTxHash(txHash);
    //     onSuccessOpen();
    // }


  } catch (error) {
    // onErrorOpen();
  } finally {
    // processing.value = false
  }

}

</script>
<template>
  <tr class="hover:bg-gray-100 transition-all duration-500 hover:scale-205 shadow hover:shadow-md ease-in-out">
    <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
      <p class="text-gray-900 whitespace-no-wrap">
        {{ transaction.metadata.location }}
      </p>
    </td>
    <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
      <p class="text-gray-900 whitespace-no-wrap">{{ formatToUsd(transaction.metadata.amountInUsd) }}
      </p>
    </td>
    <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
      <p class="text-gray-900 whitespace-no-wrap">{{ fromLovelace(transaction.metadata.amount) }}</p>
    </td>
    <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
      <p class="text-gray-900 whitespace-no-wrap">{{ transaction.metadata.paymentMethod }}</p>
    </td>
    <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
      <p class="text-gray-600 whitespace-no-wrap">
        {{ `${transaction.metadata.validityInDays} days` }}
      </p>
    </td>
    <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
      <FormSubmitButton @click="handleDistribute" :processing="processing"
        class="bg-yellow-500 hover:bg-opacity-8 text-light-100" color="yellow">
        Cancel
      </FormSubmitButton>
    </td>
  </tr>
</template>