import React, { useState, useEffect } from "react";
import { Link } from "gatsby"

import Cardano from "../../cardano/serialization-lib"
import Wallet from "../../cardano/wallet";

import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, Box, useToast } from "@chakra-ui/react";
import { ChevronRightIcon, InfoIcon } from "@chakra-ui/icons";

// loader - see line 16 in SpaceBudz/StartButton.jsx
const addressToBech32 = async () => {
    await Cardano.load();
    const address = (await window.cardano.getUsedAddresses())[0];
    return Cardano.Instance.Address.from_bytes(
      Buffer.from(address, "hex")
    ).to_bech32();
  };

const WalletButton = (props) => {
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(false);
    const connected = useStoreState((state) => state.connection.connected);
    const setConnected = useStoreActions((actions) => actions.connection.setConnected);
    const walletUtxos = useStoreState((state) => state.ownedUtxos.utxos)
    const setWalletUtxos = useStoreActions((actions) => actions.ownedUtxos.add)
    const toast = useToast();

    useEffect(async () => {
      if(connected){
        const utxos = await window.cardano.getUtxos();
        setWalletUtxos(utxos);
      }
    }, []);

    useEffect(() => {
        if (connected && !flag) {
          Wallet.enable().then((r)=> {});
          window.cardano.onAccountChange(async () => {
              const address = await addressToBech32();
              // const address = "abcd"
              setConnected(address);
              setFlag(true);
          });
        }
    }, [connected]);



    const checkConnection = async () => {
        if (window.cardano && (await window.cardano.isEnabled())) {
            const session = localStorage.getItem("session");
            if(Date.now() - parseInt(session) < 6000000) {
                //1h
                const address = await addressToBech32();
                // const address = "abcd"
                setConnected(address);
            }
        }
    };

    useEffect(() => {
        checkConnection();
    }, []);

    return connected ? (
        <Link to="/ppbldapp">
          <Button colorScheme='green'>
              View PPBL Dapp
          </Button>
        </Link>
    ) : (
        <Button
            isDisabled={loading}
            isLoading={loading}
            py="5"
            color='gl-blue'
            bg='gl-yellow'
            onClick={async () => {
                setLoading(true);
                if (!(await checkStatus(toast, connected))) {
                    setLoading(false);
                    return;
                }
                if (await Wallet.enable("nami").catch((e) => {})) {
                    const address = await addressToBech32();
                    // const address = "abcd"
                    setConnected(address);
                    localStorage.setItem("session", Date.now().toString());
                }

                setLoading(false);
            }}
        >
            Connect Wallet
        </Button>
    )
}

export default WalletButton;

const checkStatus = async (toast, connected) => {
    return (
      NoNami(toast) &&
      (await Wallet.enable("nami").catch((e) => {})) &&
      (await WrongNetworkToast(toast))
    );
};

const NoNami = (toast) => {
    if (window.cardano) return true;
    toast({
      position: "bottom-right",
      render: () => (
        <Box
          background="purple.400"
          color="white"
          px={6}
          py={3}
          rounded="3xl"
          display="flex"
          alignItems="center"
        >
          <InfoIcon />
          <Box ml="3" fontWeight="medium">
            No wallet installed
          </Box>
          <Button
            rounded="3xl"
            colorScheme="whiteAlpha"
            onClick={() => window.open("https://namiwallet.io")}
            ml="4"
            size="xs"
            rightIcon={<ChevronRightIcon />}
          >
            Get Nami
          </Button>
        </Box>
      ),
      duration: 9000,
    });
    return false;
};

const WrongNetworkToast = async (toast) => {
    // 0 for Testnet | 1 for Mainnet
    if ((await Wallet.getNetworkId()) === 0) return true;
    toast({
      position: "bottom-right",
      duration: 5000,
      render: () => (
        <Box
          background="purple.400"
          color="white"
          px={6}
          py={3}
          rounded="3xl"
          display="flex"
          alignItems="center"
        >
          <InfoIcon />
          <Box ml="3" fontWeight="medium">
            Wrong network
          </Box>
        </Box>
      ),
    });
    return false;
};