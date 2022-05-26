import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { useStoreState, useStoreActions } from "easy-peasy";
import Wallet from "../cardano/wallet";
import { fromAscii, fromHex } from "../utils/converter";
import { Flex, Center, Heading, Text, Box } from "@chakra-ui/react";

const IndexPage = () => {
  const connected = useStoreState((state) => state.connection.connected);
  const [ walletFunds, setWalletFunds ] = useState(null);
  const [ walletUtxos, setWalletUtxos ] = useState(null)

  useEffect(async () => {
    if (connected) {
      await Wallet.enable();
      const amt = await Wallet.getBalance();
      setWalletFunds(amt);
      console.log(amt)
    }
  }, [])

  useEffect(async () => {
    if (connected) {
      await Wallet.enable();
      const amt = await Wallet.getUtxos();
      setWalletUtxos(amt);
      console.log(amt)
    }
  }, [])

  return (
    <>
      <title>ppbl demo</title>
      <Flex w='100%' mx='auto' direction='column' wrap='wrap' bg='gl-yellow'>
          <Box w={{ base: '90%', md: '50%', lg: '30%' }} mx='auto' my='5'>
            <Heading size='2xl' color='gl-blue' fontWeight='medium'>Gimbal Token Bounties</Heading>
            <Heading size='md' color='gl-blue' fontWeight='medium'>An experiment in transparency and sharing responsibilities</Heading>
            <Text py='3'>
              Hi there! James here. I am one of the founders of Gimbalabs.
            </Text>
            <Text py='3'>
              I built this proof of concept to provide transparency on how I am using my Founder's allocation of Gimbal tokens (1,492,025 gimbals, which is 0.09% of all gimbals minted), to share insight into what I am working on, and to share that work with anyone looking for an entrypoint into building on Cardano.
            </Text>
            <Text py='3'>
              All of the Gimbals that I have received (and have not yet given away) are at this address: <a href="https://cardanoscan.io/address/01226bd2f54497a168b20306b7d7ef429a755eb0d612f3339e5aa622d25a94feb0ad4a5bf64bc3962c35f24fd521b7f376cb5789f19496bc5e">addr1qy3xh5h4gjt6z69jqvrt04l0g2d82h4s6cf0xvu7t2nz95j6jnltpt22t0myhsuk9s6lyn74yxmlxakt27ylr9ykh30qz97lf8</a>
            </Text>

            <Text py='3'>
              I will keep posting bounties until all of my intial Gimbals are used as rewards for completing projects. When I can, I will complete my own bounties, and therefore have a record of "earning" some Gimbals. This, I think, is something special about the organization we are building: work will get done if someone sees it as worth doing.
            </Text>
            <Heading size='xl' color='gl-blue' fontWeight='medium' pt='3'>From "Learn by Doing"</Heading>
            <Heading size='xl' color='gl-blue' fontWeight='medium' pb='3'>to "Inspire by Action"</Heading>
            <Text py='3'>
              Einstein reminds us that "the most powerful force in the Universe is compound interest". This force is not limited to financial value, but applies to compounding knowledge as well. Is it any wonder that the more we know about a topic, the more we are <em>interested</em> in it?
            </Text>
            <Text py='3'>
              The best way to learn is by doing - a little every day - and over time, compounding what we know and understand.
            </Text>
            <Text py='3'>
              Likewise, I find that I am most inspired by new ideas through steady action, day in, day out, with sufficient time for reflection. I am beginning to understand our collective "inspiration" as the sum of what we are each learning, through experience.
            </Text>
            <Heading size='xl' color='gl-blue' fontWeight='medium' py='3'>This site is a proof of concept</Heading>

            <Text py='3'>
              I intend for this project to serve as an initial prototype. Now that it exists, we can tinker with it in Plutus Project-Based Learning. It can be extended by Gimbal Tokenomics Groups, or picked up by anyone who is inspired to use it. Check out the project repo here at https://gitlab.com/jamesdunseith/gimbal-tracker
            </Text>
            <Text py='3'>
              Coming soon: notes on <Link to='/scope'>Scope</Link>
            </Text>
          </Box>
      </Flex>
    </>
  )
}

export default IndexPage;
