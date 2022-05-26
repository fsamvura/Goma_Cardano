import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import { useStoreState } from "easy-peasy"
import { Flex, Heading, Text, Box } from "@chakra-ui/react"
import { useUtxosFromAddress } from "../hooks/useUtxosFromAddress"
import useWallet from "../hooks/useWallet"
import { treasuryContractAddress } from "../cardano/treasury-contract"
import CommittedBounty from "../components/CommitedBounty"

const Distribute = () => {

  // Get connected wallet from Easy Peasy
  const { wallet } = useWallet(null)
  const connected = useStoreState((state) => state.connection.connected);
  const [walletUtxos, setWalletUtxos] = useState([]);

  // Use this hook to query the Bounty Contract address
  const {
    utxos: bountyUtxos,
    getUtxos,
    loading: utxosLoading,
    error,
  } = useUtxosFromAddress();

  useEffect(async () => {
    if (connected && wallet) {
      await getUtxos({
        variables: {
          addr: treasuryContractAddress,
        },
      });
      const myUtxos = await wallet.utxos;
      setWalletUtxos(myUtxos);
    }
  }, [wallet])

  // Map each Bounty UTXO to a consumable object that can be passed as prop to <CommittedBounty />
  // What is like this?

  return (
    <>
      <title>CANCEL</title>
      <Flex
        w="100%"
        mx="auto"
        direction="column"
        wrap="wrap"
        bg="gl-yellow"
        p="10"
      >
        <Box w="50%" mx="auto" my="5">
          <Heading py='5'>Provider of Funds can Cancel</Heading>
          <Text py='2'>1. Show list of outstanding transfers - ie, UTXOs locked at Ekival Contract here. Include details.</Text>
          <Text py='2'>2. Only implementing cancel option for now</Text>
          <Text py='2'>3. How can we test it online so many accounts test?</Text>
          <Text py='2'>4. How can we combine several cancellations?</Text>
          <Text py='2'>5. For now, just make sure this works with Issuer from front end</Text>
          {/* <Text>{JSON.stringify(bountyUtxos)}</Text> */}
          {bountyUtxos?.utxos.map(i => <CommittedBounty utxo={i} />)}

        </Box>
      </Flex>
    </>
  )
}

// we can grab Bounty Amounts from frontmatter: ada, gimbals

export const query = graphql`
  query GetTitles {
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___slug] }) {
      edges {
        node {
          frontmatter {
            title
            slug
            ada
            gimbals
          }
        }
      }
    }
  }
`

export default Distribute
