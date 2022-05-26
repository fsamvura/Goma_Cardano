import React, { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import { fromHex, toStr } from "../utils/converter";
import { Spinner, Flex, Heading, Text, Box, Button } from "@chakra-ui/react";
import useWallet from "../hooks/useWallet";
import { useUtxosFromAddress } from "../hooks/useUtxosFromAddress";
import {
  serializeTxUnspentOutput,
  valueToAssets,
} from "../cardano/transaction";

// PPBL Weeks 2-3
// 1. Establish the concept of UTxO
// 2. Learn three ways to mint native assets
// 3. Establish a defintion of Value, and show Values in Plutus + on front-end

// from connected wallet, get all UTXOs
function getWalletUtxoStrings(wallet) {
  const utxoStrings = wallet.utxos
    .map((utxo) => serializeTxUnspentOutput(utxo).output())
    .map((txOut) => valueToAssets(txOut.amount()));
  return [...new Set(utxoStrings)];
}

// given a hex-encoded Unit in a Value pair, return the policyID
function getPolicyId(unit) {
  let id = "";
  if (unit == "lovelace") {
    return "";
  } else {
    id = unit.slice(0, 56);
  }
  return id;
}

// given a hex-encoded Unit in a Value pair, return the asset name
function getTokenName(unit) {
  let name = "";
  if (unit == "lovelace") {
    return "ada";
  } else {
    let temp = fromHex(unit.substring(56));
    name = toStr(temp);
  }
  return name;
}

// PPBL: We will review how "Value" is defined in Plutus, and see how this data type works in and outside of Haskell
// If we're going to talk about Minting native assets, we need to understand how Values work!

// given a hex-encoded Unit and Quantity in a Value pair,
function getQuantity(unit, quantity) {
  if (unit == "lovelace") {
    return quantity / 1000000;
  }
  return quantity;
}

// Given a wallet, get an array of utxos, each of which is represented by an array of values
// There is a degree of redundancy here: we could just take the output of getWalletUtxoStrings as the parameter...
// ...or just combine the functions.
// Keeping them separate for now for PPBL teaching purposes
function getWalletAssetValues(wallet) {
  const utxoStrings = getWalletUtxoStrings(wallet);
  const assetValues = utxoStrings.map((utxoString) =>
    utxoString.map((currentValue) => ({
      policy: getPolicyId(currentValue.unit),
      unit: getTokenName(currentValue.unit),
      quantity: getQuantity(currentValue.unit, currentValue.quantity),
    }))
  );
  return [...new Set(assetValues)];
}

// Look for a particular asset in a wallet
function walletHoldsThisAsset(assetList, policyID) {
  let held = false;
  assetList.map((assetString) => {
    let pID = assetString.slice(0, 56);
    if (pID === policyID) {
      held = true;
    }
  });
  return held;
}

// Looking for a little challenge?
// Try to write a function that gets the sum of all Ada in the connected wallet.
// Then write a function that lists the sum of each asset.

const PPBLDapp = () => {
  const connected = useStoreState((state) => state.connection.connected);
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletBalance, setWalletBalance] = useState("");
  const [walletAssets, setWalletAssets] = useState([]);
  const [walletUtxos, setWalletUtxos] = useState([]);
  const [ppblTokenHeld, setPpblTokenHeld] = useState(false);
  const { wallet } = useWallet(null);
  const [loading, setLoading] = useState(false);
  const {
    utxos,
    getUtxos,
    loading: utxosLoading,
    error,
  } = useUtxosFromAddress();

  // on loading change, if wallet is connected, set wallet address
  useEffect(() => {
    if (connected && wallet) {
      setWalletBalance(wallet.balance);
      setWalletAddress(wallet.address);
      setWalletAssets(wallet.assets);
    }
  }, [loading]);

  // when wallet is connected, load utxo array and wallet asset array
  useEffect(async () => {
    if (connected && wallet) {
      const myUtxos = await wallet.utxos;
      setWalletUtxos(myUtxos);
      setPpblTokenHeld(
        walletHoldsThisAsset(
          walletAssets,
          "3794c001b97da7a47823ad27b29e049985a9a97f8aa6908429180e2c"
        )
      );
      // console.log(myUtxos);
      setLoading(false);
    }
  }, [wallet]);

  // monitor loading state, and us it to trigger other hooks if no utxos are loaded
  useEffect(() => {
    if (walletUtxos.length == 0) {
      setLoading(true);
    }
    if (loading) {
      setLoading(false);
    }
  }, [walletUtxos]);

  useEffect(() => utxos && console.log(utxos), [utxos]);

  return (
    <>
      <title>demo v0</title>
      <Flex
        w="100%"
        mx="auto"
        direction="column"
        wrap="wrap"
        bg="gl-yellow"
        p="10"
      >
        <Box w="50%" mx="auto">
          <Heading size="4xl" color="gl-blue" fontWeight="medium" py="5">
            PPBL Demo "Dapp"
          </Heading>
          <Heading py="5" size="lg">
            First things first:
          </Heading>
          <Text py="3" fontSize="lg">
            This "decentralized application" (or "Dapp") does not do much - at
            least not yet! The purpose of this demo is simply to show you that
            by using a browser-extension-based wallet like Nami (or CCValut,
            Flint), you can see information from the blockchain on the front-end
            of a web site.
          </Text>
          <Text py="3" fontSize="lg">
            Our goal is to help you get comfortable with these tools and to see
            how they all work together, before we start going deeper.
          </Text>
          <Text py="3" fontSize="lg">
            So what can this Dapp do?
          </Text>
          <Heading py="5" size="lg">
            It can show you the Address of your connected wallet:
          </Heading>
          <Text py="3" fontSize="lg">
            {walletAddress}
          </Text>
          <Heading py="5" size="lg">
            It can show you the Balance of your connected wallet:
          </Heading>
          <Text py="3" fontSize="lg">
            {walletBalance}
          </Text>
          <Heading py="5" size="lg">
            It can show you the Assets in your connected wallet:
          </Heading>
          <Box py="3" fontSize="lg">
            {walletAssets.map((asset, index) => (
              <p key={Math.random() * index}>
                {index}: {toStr(fromHex(asset.slice(56)))}
              </p>
            ))}
          </Box>
          {loading ? (
            <Box>loading...</Box>
          ) : (
            <Box my="5">
              <Heading py="5" size="lg">
                And it can behave differently depending on which tokens you
                hold:
              </Heading>
              <Flex direction="column" bg="white" py="10" justify="center">
                {ppblTokenHeld ? (
                  <Box
                    w="50%"
                    minH="100px"
                    mx="auto"
                    p="3"
                    bg="purple.800"
                    color="white"
                    fontSize="xl"
                  >
                    HELLO! This box is purple, and you will only see it if your
                    connected wallet holds a PlutusPBLCourse01 token with the
                    Policy ID:
                    3794c001b97da7a47823ad27b29e049985a9a97f8aa6908429180e2c
                  </Box>
                ) : (
                  <Box
                    w="50%"
                    minH="100px"
                    mx="auto"
                    p="3"
                    bg="orange.200"
                    color="black"
                    fontSize="xl"
                  >
                    HELLO! This box is orange, you will only see it if your
                    connected wallet does not hold a PlutusPBLCourse01 token
                    with the Policy ID:
                    3794c001b97da7a47823ad27b29e049985a9a97f8aa6908429180e2c
                  </Box>
                )}
              </Flex>
            </Box>
          )}
          <Heading py="5" size="lg">
            Try to get the UTxOs of our smart contract.
          </Heading>
          <Button
            colorScheme="green"
            onClick={() => {
              getUtxos({
                variables: {
                  addr: "addr_test1wpnlxv2xv9a9ucvnvzqakwepzl9ltx7jzgm53av2e9ncv4sysemm8",
                },
              });
            }}
          >
            {utxosLoading ? <Spinner /> : "Fetch & Print Utxos"}
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default PPBLDapp;
