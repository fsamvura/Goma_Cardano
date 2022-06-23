<script lang="ts" setup>
import { useWallet } from '~/stores/wallet'
import { createBountyDatum } from "@/utils/factory";
import { showSwalMessage } from '@/utils/ui-utils'
import { formatToUsd, fromLovelace } from '@/utils/converter'
import type { TransactionLock, TransactionUtxo } from '@/features/transactions/Data'
import { distributeBounty } from "@/modules/cardano/bounty-contract";
import {
  treasuryContractAddress,
} from "@/modules/cardano/treasury-contract";

interface Props {
  order: TransactionUtxo
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'cancelled', order: TransactionUtxo): void
}>()

const transaction = computed(() => props.order.transaction)

const processing = ref(false)

const walletStore = useWallet()
const {
  getAddressesFromUtxo
} = useUtxosFromAddress();

// @ts-ignore
const getContributorAddress = (txAddresses) => {
  // @ts-ignore
  const transactionAddresses = txAddresses.transactions[0]?.inputs.map((input) => input.address);
  // @ts-ignore
  const contributorAddresses = transactionAddresses?.filter((address) => address != treasuryContractAddress);
  return contributorAddresses[0]
}

const handleDistribute = async () => {
  try {
    processing.value = true


    const metadata = transaction.value.metadata
    const bountyTxHash = transaction.value.hash
    const slug = "Trans_number";
    const lovelace = props.order.value;
    const contributorAddress = props.order.contributorAddress;
    const bountyTxIx = props.order.index;

    const currentDate = new Date();
    const expirationTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + Number.parseInt(metadata.validityInDays));

    if (!contributorAddress) {
      showSwalMessage('Operation aborted', 'Contributor address not found', 'error')
      return
    }


    // const bDatum = createBountyDatum(
    //   contributorAddress,
    //   contributorAddress,
    //   metadata.amount,
    //   metadata.minimum,
    //   expirationTime.getTime(),
    //   "1",
    //   "0"
    // )

    const bDatum = createBountyDatum(
      contributorAddress,
      contributorAddress,
      "800000000",
      "200000000",
      "1651025390000",
      "1",
      "0"
    );

    const bUtxo = {
      "tx_hash": bountyTxHash,
      "output_index": bountyTxIx,
      "amount": [
        { "unit": "lovelace", "quantity": `${lovelace}` }
      ],
    }
    console.log("bounty UTXO:", bUtxo)

    const bountyDistribution = {
      issuerAddress: walletStore.walletAddress,
      utxosParam: walletStore.walletUtxos,
      contributorAddress,
      slug,
      lovelace,
    }

    const txHash = await distributeBounty(bUtxo, bDatum, bountyDistribution)
    console.log("txHash is", txHash)
    if (txHash) {
      emit('cancelled', props.order)
    } else {
      showSwalMessage('Operation aborted', 'An error has occured', 'error')
    }

  } catch (error) {
    console.log("error:", error)
    // @ts-ignore
    if (error.info) {
      // @ts-ignore
      showSwalMessage('Dang ! Operation aborted', error.info, 'error')
    }
  } finally {
    processing.value = false
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
      <FormSubmitButton v-if="props.order.index === null" :processing="processing"
        class="bg-gray-500 hover:bg-opacity-8 text-primary" color="yellow">
        Locking
      </FormSubmitButton>
      <FormSubmitButton v-else @click="handleDistribute" :processing="processing"
        class="bg-yellow-500 hover:bg-opacity-8 text-light-100" color="yellow">
        Cancel
      </FormSubmitButton>
    </td>
  </tr>
</template>