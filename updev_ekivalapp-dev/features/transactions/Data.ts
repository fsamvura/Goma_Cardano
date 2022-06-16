import { object, string, number, InferType }from 'yup'

export const phoneSchema = object({
    countrycode: string().default('+243'),
    number:number().required("Veuillez spécifier un numéro de téléphone").default(9843743743)
})

export interface Phone extends InferType<typeof phoneSchema> {}

export const sendSchema = object({
    amount:number().nullable(),
    // amount:number().nullable().required("Veuillez spécifier un montant valide"),
    amountInAda:number().nullable(),
    minAmount:number().default(1),
    // receiverToSend:string().nullable(),
    validityInDays: number().default(3),
    cityToSend: number().nullable(),
    paymentMethod: string().default('CASH'),
    contactName: string().nullable(),
    contactEmail: string().nullable(),
    contactPhone: string().nullable(),
    // destinatorMail: string().required("Veuillez spécifier le mail du destinataire"),
    // destinatorNames: string().required("Veuillez spécifier les noms du destinataire"),
    // phone:phoneSchema,
})

export interface LockFundsData extends InferType<typeof sendSchema> {}

export type TransactionSate = 'locked' | 'accepted' | 'expired' | 'cancelled'

export type PaymentType = 'CASH' | 'MOBILE'

export interface TransactionInput{
    address:string
}

export interface TransactionOutput{
    address:string
    value:string
}

export interface TransactionMetadata{
    amount: number,
    amountInUsd: number,
    minimum: number,
    deposit: number,
    depositInUsd: number,
    location: string,
    provider: string,
    paymentMethod: string,
    validityInDays: string,
    contactName?: string,
    contactEmail?: string,
    contactPhone?: string,
    expirationTime?:string,
    state?: TransactionSate
}

export interface TransactionLock{
    hash:string,
    includedAt:string,
    inputs:TransactionInput[],
    outputs:TransactionOutput[],
    metadata:TransactionMetadata
}
export interface Transaction{
    id:string,
    source:string,
    destination:string,
    status:string,
    amountInUsd:number,
    amountInAda:number,
    validityInDays:number,
    date:Date,
    contactName?: string,
    contactEmail?: string,
    contactPhone?: string,
}

export interface Notification{
    title:string,
    source:string,
    destination:string,
    status:string,
    amountInUsd:number,
    date:Date
}

export const notifications:Notification[] = [
    {title:"Transaction en cours",source:"Paris",destination:"Kinshasa",status:"pending",amountInUsd:100,date:new Date()},
    {title:"Transaction en cours",source:"Paris",destination:"Kinshasa",status:"pending",amountInUsd:100,date:new Date()},
    {title:"Transaction terminé",source:"Paris",destination:"Kinshasa",status:"completed",amountInUsd:100,date:new Date()},
    {title:"Transaction terminé",source:"Paris",destination:"Kinshasa",status:"completed",amountInUsd:100,date:new Date()},	
];