// @ts-nocheck
import Cardano from "../serialization-lib";
import { serializeTxUnspentOutput, valueToAssets } from "../transaction";
import { fromHex } from "@/utils/converter";

class Wallet {
  private _provider:any;
  async enable(name) {
    await Cardano.load();

    // For reference: https://cips.cardano.org/cips/cip30/

    if (name === "ccvault") {
       //@ts-ignore
      const instance = await window.cardano?.ccvault?.enable();
      if (instance) {
        this._provider = instance;
        return true;
      }
    } else if (name === "gerowallet") {
       //@ts-ignore
      const instance = await window.cardano?.gerowallet?.enable();
      if (instance) {
        this._provider = instance;
        return true;
      }
    } else if (name === "nami" || name === false) {
       //@ts-ignore
      const instance = await window.cardano?.nami.enable();
      if (instance) {
         //@ts-ignore
        this._provider = window.cardano;
        return true;
      }
    }

    return false;
  }

  getAvailableWallets() {
    let availableWallets = [];
     //@ts-ignore
    if (window.cardano === undefined) {
      return availableWallets;
    }
     //@ts-ignore
    if (window.cardano.ccvault) {
      availableWallets.push("ccvault");
    }
     //@ts-ignore
    if (window.cardano.gerowallet) {
      availableWallets.push("gerowallet");
    }
     //@ts-ignore
    if (window.cardano.enable) {
      availableWallets.push("nami");
    }

    return availableWallets;
  }

  isEnabled() {
    return this._provider !== undefined;
  }

  async load() {
     //@ts-ignore
    if (window.cardano === undefined) return;

    await Cardano.load();

    return this._provider;
  }

  async getAssets() {
    const utxos = await this._provider.getUtxos();

    const nativeAssets = utxos
      .map((utxo) => serializeTxUnspentOutput(utxo).output())
      .filter((txOut) => txOut.amount().multiasset() !== undefined)
      .map((txOut) => valueToAssets(txOut.amount()))
      .flatMap((assets) =>
        assets
          .filter((asset) => asset.unit !== "lovelace")
          .map((asset) => asset.unit)
      );

    return [...new Set(nativeAssets)];
  }

  async getBalance() {

    const balance = await this._provider.getBalance();

    return Cardano.Instance.Value.from_bytes(fromHex(balance)).coin().to_str();
  }

  async getCollateral() {
    return await this._provider.getCollateral();
  };

  async getNetworkId() {
    return await this._provider.getNetworkId();
  };

  async getUsedAddresses() {
    const usedAddresses = await this._provider.getUsedAddresses();

    return usedAddresses.map((address) =>
      Cardano.Instance.Address.from_bytes(fromHex(address)).to_bech32()
    );
  };

  async getUtxos() {
    return await this._provider.getUtxos();
  };

  async signTx(tx, partialSign = true) {
    return await this._provider.signTx(tx, partialSign);
  };

  async submitTx(tx) {
    return await this._provider.submitTx(tx);
  };
}

export default new Wallet();
