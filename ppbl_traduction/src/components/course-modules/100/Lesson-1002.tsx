import AssignmentComponent from "@/src/components/lms/Lesson/AssignmentComponent";
import SuccessComponent from "@/src/components/lms/Lesson/SuccessComponent";
import VideoComponent from "@/src/components/lms/Lesson/VideoComponent";
import SLT from "@/src/components/ui/Text/SLT";
import {
  Box,
  Grid,
  ListItem,
  OrderedList,
  Stack,
  StackDivider,
  Text,
  Link as CLink,
  Button,
  GridItem,
  Divider,
} from "@chakra-ui/react";
import { CardanoWallet, useAddress, useLovelace, useNetwork, useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import LessonLayout from "../../lms/Lesson/LessonLayout";

export default function Lesson1002() {
  const { connected, wallet } = useWallet();
  const address = useAddress();
  const network = useNetwork();
  const lovelace = useLovelace();

  const [mastery, setMastery] = useState(false);

  useEffect(() => {
    if (network == 0 && lovelace && parseInt(lovelace) > 0) {
      setMastery(true);
    }
  }, [connected, network, lovelace]);

  return (
    <LessonLayout moduleNumber={100} sltId="100.2">
      <Grid mx="auto" fontWeight="bold" lineHeight="200%" templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem w="90%" mx="auto">
          <Text fontSize="lg" py="3">
            To make it easy for developers to build and test applications on Cardano, IOHK provides{" "}
            <CLink>Testnet Faucets</CLink> within the{" "}
            <CLink href="https://docs.cardano.org/" target="_blank">Cardano Ecosystem documentation</CLink>.
          </Text>
          <Text fontSize="lg" py="3">
            Watch this video to see how to get test-Ada, or &rdquo;tAda&rdquo; on the Prepod testnet, or follow the
            steps below.
          </Text>
        </GridItem>
        <GridItem>
          <VideoComponent videoId="aaaaa">How to get tAda from the Preprod Faucet</VideoComponent>
        </GridItem>
      </Grid>
      <Divider py="5" />

      <AssignmentComponent>
        <OrderedList pb="5">
          <ListItem>
            Go to{" "}
            <CLink href="https://docs.cardano.org/cardano-testnet/tools/faucet" target="_blank">
              https://docs.cardano.org/cardano-testnet/tools/faucet
            </CLink>
          </ListItem>
          <ListItem>Make sure to select &rdquo;Preprod Testnet&rdquo; from the Environment menu.</ListItem>
          <ListItem>Enter your Preprod address and submit the form.</ListItem>
          <ListItem>
            Wait a few moments for your &rdquo;tAda&rdquo; to arrive. Then refresh this page and connect your wallet
            again.
          </ListItem>
        </OrderedList>
        <SuccessComponent mastery={connected && mastery}>
          {mastery ? (
            <Box>
              <Text>Congrats! You are now rich with tAda!</Text>
            </Box>
          ) : (
            <Box>
              <Text>You will know you are successful if you have tAda in your Preprod wallet.</Text>
            </Box>
          )}
        </SuccessComponent>
      </AssignmentComponent>
      <Link href="/modules/100/1003">
        <Button my="1em">Continue to Lesson 3</Button>
      </Link>
    </LessonLayout>
  );
}
