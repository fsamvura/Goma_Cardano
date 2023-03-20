import ContributorPairMintingComponent from "@/src/components/course-modules/100/ContributorMinter/ContributorPairMintingComponent";
import AssignmentComponent from "@/src/components/lms/Lesson/AssignmentComponent";
import SuccessComponent from "@/src/components/lms/Lesson/SuccessComponent";
import SLT from "@/src/components/ui/Text/SLT";
import {
  Box,
  Divider,
  Grid,
  GridItem,
  Heading,
  ListItem,
  OrderedList,
  Stack,
  StackDivider,
  Text,
  UnorderedList,
  Link as CLink,
} from "@chakra-ui/react";
import { Asset } from "@meshsdk/core";
import { useAssets, useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import LessonLayout from "@/src/components/lms/Lesson/LessonLayout";
import VideoComponent from "@/src/components/lms/Lesson/VideoComponent";

export default function Lesson1004() {
  const { connected } = useWallet();
  const walletAssets = useAssets();

  const [connectedPPBL2023Token, setConnectedPPBL2023Token] = useState<Asset | undefined>(undefined);

  useEffect(() => {
    if (walletAssets) {
      const _ppbl2023 = walletAssets.filter(
        (a: Asset) => a.unit.substring(0, 56) == "05cf1f9c1e4cdcb6702ed2c978d55beff5e178b206b4ec7935d5e056"
      );
      setConnectedPPBL2023Token(_ppbl2023[0]);
    }
  }, [walletAssets]);

  return (
    <LessonLayout moduleNumber={100} sltId="100.4">
      <Grid mx="auto" fontSize="lg" fontWeight="bold" lineHeight="200%" templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem w="90%" mx="auto">
          <Text py="3">
            For our first project, we will focus on the{" "}
            <Text as="span" color="theme.green" fontWeight="bold">
              PPBL Contributor Token
            </Text>
            .
          </Text>
          <Text py="3">There is a lot we want to tell you about the Contributor token:</Text>
          <UnorderedList ml="10">
            <ListItem>how it is minted using <CLink href="https://meshjs.dev/" target="_blank">MeshJS</CLink></ListItem>
            <ListItem>how it serves as an experimental implementation of <CLink href="https://cips.cardano.org/cips/cip68/" target="_blank">CIP-68</CLink></ListItem>
            <ListItem>how you will be able to use Plutus to change the behavior of the token</ListItem>
          </UnorderedList>

          <Text py="3">
            We will cover all of the points above and much more in this course. But first, let&rsquo;s just make sure that you
            have a Contributor Token.
          </Text>
          <Text>Review this video, or follow the steps below to mint your PPBL2023 Token.</Text>
        </GridItem>
        <GridItem>
          <VideoComponent videoId="aaaaa">About Your New Contributor Token</VideoComponent>
        </GridItem>
      </Grid>
      <Divider py="5" />

      <AssignmentComponent>
        <Text></Text>
        <OrderedList pb="5" ml="10" w="60%">
          <ListItem py="1" pl="2">Confirm that your wallet is connected to Cardano Preprod Testnet.</ListItem>
          <ListItem py="1" pl="2">Make sure that collateral is set, and that dapp connection is enabled in your wallet. To learn about collateral and dapp connection, watch the video above.</ListItem>
          <ListItem py="1" pl="2">Choose an alias for your token. Remember that you are minting a token on a blockchain, and the name of your token will be on a permanent ledger.</ListItem>
          <ListItem py="1" pl="2">Click the Mint button, then sign and submit the transaction.</ListItem>
          <ListItem py="1" pl="2">Refresh this page to see your new token.</ListItem>
          <ListItem py="1" pl="2">
            Your custom PPBL 2023 token will be minted directly to your wallet.
          </ListItem>
        </OrderedList>

        <SuccessComponent mastery={connected && connectedPPBL2023Token != undefined}>
          {connected ? (
            <>
              {connectedPPBL2023Token != undefined ? (
                <Box bg="theme.green" color="theme.dark" w="60%" mx="auto" my="5" p="5">
                  <Heading py="3" textAlign="center">
                    &#127881; You have a PPBL2023 Token &#127881;
                  </Heading>
                  <Text py="3">Congratulations, you are now officially signed up for PPBL 2023!</Text>
                  <Heading size="md" py="3">
                    &#127959; Up Next: &#127959;
                  </Heading>
                  <Box mx="5">
                    <UnorderedList>
                      <ListItem>
                        {" "}
                        In this Plutus PBL Course, you will learn how your PPBL2023 token was minted, and how to use
                        tokens to make applications respond differently when different tokens are connected.
                      </ListItem>
                      <ListItem>
                        In Modules 101 and 102, you will learn how to change the lucky number on your new Contributor
                        Token.
                      </ListItem>
                      <ListItem>
                        You will also learn how to hack this web site and mint as many PPBL2023 tokens as you want - but
                        more on that later.
                      </ListItem>
                    </UnorderedList>
                  </Box>
                  <Text py="3">We are excited to be on this journey with you!</Text>
                </Box>
              ) : (
                <>
                  <ContributorPairMintingComponent />
                  <Divider py="5" />
                  <Heading size="md">You will know you are successful if:</Heading>
                  <Text py="2">You can see a token in your Preprod wallet with this Policy ID:</Text>
                  <code>05cf1f9c1e4cdcb6702ed2c978d55beff5e178b206b4ec7935d5e056</code>
                </>
              )}
            </>
          ) : (
            "make sure to connect a wallet"
          )}
        </SuccessComponent>
      </AssignmentComponent>
    </LessonLayout>
  );
}
