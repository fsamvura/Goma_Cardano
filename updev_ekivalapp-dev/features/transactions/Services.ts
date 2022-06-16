import wallet from '@/modules/cardano/wallet'
import { lockingTx } from "@/modules/cardano/locking-tx"
import { distributeBounty } from '@/modules/cardano/bounty-contract'
import {commitToBounty} from '@/modules/cardano/treasury-contract'
import {fromBech32, fromStr, addFloat, adaToUsdConversionRate} from '@/utils/converter'
import { LockFundsData, TransactionInput, TransactionLock, TransactionOutput } from './Data'

export const isLocked = (trans:TransactionLock) => trans.metadata.state == undefined || trans.metadata.state === 'locked'

export async function toTransactionLock (tx:any) 
{
    if (tx && tx.metadata[0]) {
        const metadata = tx.metadata[0].value
    
        const transaction: TransactionLock = {
            hash: tx.hash,
            includedAt: tx.includedAt,
            inputs: tx.inputs as TransactionInput[],
            outputs: tx.outputs as TransactionOutput[],
            metadata: {
              amount: metadata.amount,
              amountInUsd: metadata.amountInUsd,
              deposit: metadata.deposit,
              minimum: metadata.minimum,
              depositInUsd: metadata.depositInUsd,
              location: metadata.location,
              provider: metadata.provider,
              paymentMethod: metadata.paymentMethod,
            //   location: regions.find(x => x._id == tx.metadata[0].value.location)?.designation ?? 'Inconnu',
              validityInDays: metadata.validityInDays,
              contactEmail: metadata.contactEmail,
              contactName: metadata.contactName,
              contactPhone: metadata.contactPhone,
              expirationTime: metadata.expirationTime,
              state: metadata.state,
            },
        }
        
        return transaction
    }
}

export async function cancelLockedFunds(data:TransactionLock, bUtxo:any) {
    const walletAdresses = await wallet.getUsedAddresses()
    const walletAdress = walletAdresses[0] 
    const minimum = "200000000";
    const expirationTime = data.metadata.expirationTime ?? '1651025390000'
    const walletUtxos = await wallet.getUtxos()

    const providerAddress = fromBech32(walletAdress)
    const funderAddress = fromBech32(walletAdress)

    const bDatum = { providerAddress, 
        funderAddress, lovelaceAmount:data.metadata.amount,minValue:minimum, expirationTime:expirationTime,
         serviceType:"1" , commitStatus:"0" }
    
    const txHash = await  distributeBounty(bUtxo,bDatum,{providerAddress:walletAdress,
        funderAddress:walletAdress, utxosParam:walletUtxos,slug:0,lovelace:data.metadata.amount})
   return txHash
}

export async function distribute(amount:number, bUtxo:any){

    const walletAdresses = await wallet.getUsedAddresses()
    const walletAdress = walletAdresses[0]
    const walletUtxos = await wallet.getUtxos()

    const providerAddress = fromBech32(walletAdress)
    const funderAddress = fromBech32(walletAdress)

    const bDatum = { providerAddress, 
        funderAddress, lovelaceAmount:amount,minValue:200000, expirationTime:3,
         serviceType:3 , commitStatus:3 }

   const txHash = await  distributeBounty(bUtxo,bDatum,{providerAddress:walletAdress,
    funderAddress: walletAdress, utxosParam:walletUtxos,slug:0,lovelace:amount})
   return txHash
}

export async function commit(amount:number, tUtxo:any){

    const walletAdresses = await wallet.getUsedAddresses()
    const walletAdress = walletAdresses[0]
    const walletUtxos = await wallet.getUtxos()

    const providerAddress = fromStr(walletAdress)
    const funderAddress = fromStr(walletAdress)
    

    const bDatum = { providerAddress, 
        funderAddress, lovelaceAmount:amount,minValue:200000, expirationTime:3,
         serviceType:3 , commitStatus:3 }

    const tDatum = { providerAddress, 
            funderAddress, lovelaceAmount:amount,minValue:200000, expirationTime:3,
             serviceType:3 , commitStatus:3 }

   const txHash = await  commitToBounty(bDatum,tDatum,{contributorAddress:walletAdress,utxosParam:walletUtxos,
    bountySlug:0,bAda: amount/1000000,bGimbals:0,tUtxo,tLovelaceIn:amount,tGimbalsIn:0})
    
   return txHash
}



