import { defineStore } from 'pinia'
import type { TransactionLock } from '@/features/transactions/Data'

export interface IState {
  orders: TransactionLock[]
}

export const useMain = defineStore('main', {
  state: (): IState => ({
    orders: [],
  }),
  getters: {

  },
  actions: {
    setTransactionOrders(transactions: TransactionLock[]) {
      this.orders = transactions
    },
    addTransactionOrder(transaction: TransactionLock) {
      const idx = this.orders.findIndex(o => o.hash === transaction.hash)
      if (idx === -1) {
        this.orders.unshift(transaction)
      }
    },
    removeTransactionOrder(transaction: TransactionLock) {
      const index = this.orders.findIndex(o => o.hash === transaction.hash)
      if (index > -1) {
        this.orders.splice(index, 1)
      }
    },

  },
})
