import { defineStore } from 'pinia'
import type { Region } from '@/server/api/regions';
import type { TransactionUtxo } from '@/features/transactions/Data'

export interface IState {
  orders: TransactionUtxo[]
  regions:Region[]

}

export const useMain = defineStore('main', {
  state: (): IState => ({
    orders: [],
    regions: [],
  }),
  getters: {},
  actions: {
    setTransactionOrders(transactions: TransactionUtxo[]) {
      this.orders = transactions
    },
    addTransactionOrder(txUtxo: TransactionUtxo) {
      const idx = this.orders.findIndex(o => o.transaction.hash === txUtxo.transaction.hash)
      if (idx === -1) {
        this.orders.unshift(txUtxo)
      }
    },
    removeTransactionOrder(txUtxo: TransactionUtxo) {
      const index = this.orders.findIndex(o => o.transaction.hash === txUtxo.transaction.hash)
      if (index > -1) {
        this.orders.splice(index, 1)
      }
    },
    async loadRegions(): Promise<void> {
      if (this.regions.length === 0) {
        const { data } = await useFetch('/api/regions')
        if (data.value.length) {
          this.regions = data.value
        }
      }
    }
  },
})
