import Cardano from "@/modules/cardano/serialization-lib";
import { Buffer } from 'buffer'

//@ts-ignore
export const fromBech32 = (bech32) =>
  Cardano?.Instance?.BaseAddress.from_address(
    Cardano?.Instance?.Address.from_bech32(bech32) // returns an address object
  );

//@ts-ignore
export const fromHex = (hex) => Buffer.from(hex, "hex");

//@ts-ignore
export const toHex = (bytes) => Buffer.from(bytes).toString("hex");

export const fromLovelace = (lovelace: number) => lovelace / 1000000;

export const toLovelace = (ada: number) => ada * 1000000;

export const fromStr = (str: string) => Buffer.from(str, "utf-8");

//@ts-ignore
export const toStr = (bytes) => String.fromCharCode.apply(String, bytes);

export const adaToUsdConversionRate = 0.64;

export const removeFloat = (amountInUsd:number) => {
  const amount = Number(amountInUsd);
  if(Number.isInteger(amount)){
    return amount;
  }
  const fixed = amount.toFixed(2);
  const fixedFloat = parseFloat(fixed);
  return fixedFloat * 100;
}

export const addFloat = (amountInUsdWithFloat:number) => {
  const fixed = amountInUsdWithFloat / 100;
  return fixed
}

export const formatToUsd = (amount:number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(amount)
}