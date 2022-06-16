import Cardano from "@/modules/cardano/serialization-lib";
import { toHex } from "./converter";

export const createBountyDatum = (issuerAddr, contributorAddr, lovelaceAmoun, minValu, expirationTim, serviceTyp, commitStatu) => {
  // issuer = Bech32Address
  // contributor = Bech32Address
  // lovelaceAmount = lovelace
  // tokenAmount = play
  // expirationTime = placeholder value for now

  console.log("creating bounty datum")
  if (issuerAddr && contributorAddr && lovelaceAmoun && minValu && expirationTim) {
    return {
      providerAddress: getAddressKeyHash(issuerAddr),
      funderAddress: getAddressKeyHash(contributorAddr),
      lovelaceAmount: lovelaceAmoun,
      minValue: minValu,
      expirationTime: expirationTim,
      serviceType: serviceTyp,
      commitStatus: commitStatu
    };
  }
};

export const createTreasuryDatum = (providerAddres, funderAddres, lovelaceAmoun, minValu, expirationTim, serviceTyp, commitStatu) => {
  // issuerAddr = Bech32Address
  // count can be used to keep track of # of bounties; not implementing yet

  console.log("creating treasury datum")
  if (providerAddres && lovelaceAmoun && minValu && expirationTim && serviceTyp && commitStatu) {
    return {
      providerAddress: getAddressKeyHash(providerAddres),
      funderAddress: getAddressKeyHash(funderAddres),
      lovelaceAmount: lovelaceAmoun,
      minValue: minValu,
      expirationTime: expirationTim,
      serviceType: serviceTyp,
      commitStatus: commitStatu,
    };
  }
};


export const getAddressKeyHash = (address) => {
  return toHex(
    Cardano.Instance.BaseAddress.from_address(
      Cardano.Instance.Address.from_bech32(address)
    )
      .payment_cred()
      .to_keyhash()
      .to_bytes()
  );
};

// /**
//  * @param {string} byWallet - a wallet address needs to be in bech32 format.
//  */
// export const createEvent = (action, datum, txHash, byWallet) => {
//   if (action && datum && txHash && byWallet) {
//     return {
//       action,
//       datum,
//       txHash,
//       submittedBy: byWallet,
//       submittedOn: new Date().getTime(),
//     };
//   }
// };

// /**
//  * @param {string} byWallet - a wallet address needs to be in bech32 format.
//  */
// export const createOffer = (byWallet, forAsset, value) => {
//   if (byWallet && forAsset && value) {
//     return {
//       by: byWallet,
//       for: forAsset,
//       on: new Date().getTime(),
//       value,
//     };
//   }
// };