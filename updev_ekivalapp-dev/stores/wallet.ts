import { defineStore } from 'pinia'
import { fromLovelace } from '@/utils/converter';
import cardanoWallet from '@/modules/cardano/wallet'

export type WalletType = 'nami' | 'gerowallet' | 'ccvault'

export interface IWallet{
  enable: () => boolean
}

export interface IWalletState {
  balance: number
  connecting: boolean
  isModalOpened: boolean
  currentWallet: WalletType
  isWalletConnected: boolean
  cardanoWallets: WalletType[]
  availableWallets: WalletType[]
  walletAddress: string | null
  networkId: number | null
  walletUtxos: string[]
  usdRate: number
}

export const useWallet = defineStore('wallet', {
  state: (): IWalletState => ({
    balance: 0,
    connecting: false,
    isModalOpened: false,
    isWalletConnected: false,
    availableWallets: [],
    currentWallet: 'nami',
    cardanoWallets: ['nami', 'gerowallet', 'ccvault'],
    walletAddress: null,
    networkId: null,
    walletUtxos: [],
    // We temporary set exchange rate statically
    usdRate: 0.64,
  }),
  getters: {
    formattedAddress () {
      if (this.walletAddress) {
        const addr: string = this.walletAddress
       return  `${addr.substring(0, 12)}...${addr.substring(addr.length - 8)}`
      }
      return null
    },
    actualBalance (): number {
      return fromLovelace(this.balance)
    },
    usdBalance (): number  {
      if (this.actualBalance) {
       return Number.parseFloat((this.actualBalance * this.usdRate).toFixed(0))
      }
      return 0
    },
  },
  actions: {
    toggleModal(val: boolean) {
      this.isModalOpened = val
    },
    async connectToWallet (walletName?: string) {
      this.connecting = true
      try {
        if (!cardanoWallet.isEnabled()) {
          await cardanoWallet.enable(walletName)
        }
        await cardanoWallet.load()
        this.networkId = await cardanoWallet.getNetworkId()
        this.walletAddress = (await cardanoWallet.getUsedAddresses())[0]
        this.balance = await cardanoWallet.getBalance() as unknown as number;
        this.walletUtxos = await cardanoWallet.getUtxos();
        this.isWalletConnected = cardanoWallet.isEnabled()
        
      } catch (error) {
        console.log('error', error)
      } finally {
        this.connecting = false
      }
    },
    async refreshBalance () {
      this.balance = await cardanoWallet.getBalance() as unknown as number;
    },
    disconnect () {
      this.isWalletConnected = false
    },
    async loadAvailableWallets() {
      const wallets = await cardanoWallet.getAvailableWallets() as WalletType[];
      if (wallets.length > 0) {
         this.availableWallets = wallets
      }
    },
  },
})
