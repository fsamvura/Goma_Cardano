import { useEffect, useState } from 'react';
import { useStoreState } from "easy-peasy";

import Cardano from '../cardano/serialization-lib';
import Wallet from '../cardano/wallet';
import { fromLovelace } from '../utils/converter';

const useWallet = (initial = null) => {
  const connected = useStoreState((state) => state.connection.connected);
  const [wallet, setWallet] = useState(initial);

  useEffect(() => {
    if (connected && wallet === null) {
      getWallet();
    }
  }, [connected]);

  const getWallet = async () => {
    await Cardano.load();
    await Wallet.enable('nami');
    const walletAddress = (await Wallet.getUsedAddresses())[0];
    const walletAssets = await Wallet.getAssets();
    const walletBalance = await Wallet.getBalance();
    const walletUtxos = await Wallet.getUtxos();

    setWallet({
      address: walletAddress,
      assets: walletAssets,
      balance: fromLovelace(walletBalance),
      utxos: walletUtxos,
    });
  };

  return { wallet };
};

export default useWallet;
