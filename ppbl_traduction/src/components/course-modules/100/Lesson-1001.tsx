import AssignmentComponent from "@/src/components/lms/Lesson/AssignmentComponent";
import SuccessComponent from "@/src/components/lms/Lesson/SuccessComponent";
import VideoComponent from "@/src/components/lms/Lesson/VideoComponent";
import SLT from "@/src/components/ui/Text/SLT";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  ListItem,
  OrderedList,
  Stack,
  StackDivider,
  Text,
  Link as CLink,
} from "@chakra-ui/react";
import { CardanoWallet, useAddress, useNetwork, useWallet } from "@meshsdk/react";
import Link from "next/link";
import LessonLayout from "../../lms/Lesson/LessonLayout";

export default function Lesson1001() {
  const { connected, wallet } = useWallet();
  const address = useAddress();
  const network = useNetwork();

  return (
    <LessonLayout moduleNumber={100} sltId="100.1">
      <Grid mx="auto" fontSize="xl" fontWeight="semibold" lineHeight="200%" templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem w="90%" mx="auto">
          <Text py="3">
            Usually, when we talk about Cardano, we are talking about the &rdquo;Cardano Mainnet&rdquo;.
          </Text>
          <Text py="3">
            But Mainnet is not the only Cardano network.
          </Text>

          <Text py="3">
            We would not want to test new decentralized applications on the Cardano Mainnet: if we made a mistake, we could lose
            tokens that have a real value!
          </Text>
          <Text py="3">
            That&rsquo;s why in this course we will use Cardano&rsquo;s &rdquo;pre-production test network&rdquo; also known as &rdquo;Preprod&rdquo;.
          </Text>
          <Text py="3">
            Your first task in PPBL 2023 is to connect a browser-based wallet to Preprod.
          </Text>
        </GridItem>
        <GridItem>
          <VideoComponent videoId="9hwa4wEl41k">How to connect your wallet to Pre-Production Testnet:</VideoComponent>
        </GridItem>
      </Grid>
      <Divider py="5" />

      <AssignmentComponent>
        <OrderedList>
          <ListItem>Make sure that you have a browser wallet like <CLink href="https://namiwallet.io/" target="_blank">Nami</CLink> or <CLink href="https://eternl.io/" target="_blank">Eternl</CLink> installed.</ListItem>
          <ListItem>Review the short video above to see how to connect your wallet to Preprod.</ListItem>
          <ListItem>Use the Connect Wallet button below to see if you are successful!</ListItem>
        </OrderedList>
        <Text py="5">Try to connect a wallet. Make sure it is on Cardano Pre-Production test network.</Text>
        <Box mb="20">
          <CardanoWallet />
        </Box>
        <SuccessComponent mastery={connected && network == 0}>
          <>
            {network == 0 ? (
              <>
                <Text color="theme.green" fontWeight="bold">
                  You are now connected to a Cardano Testnet at the address:
                </Text>
                <Text fontSize="sm" py="2">
                  {address}
                </Text>
                <Text py="5">
                  Nice work. In the next lesson, you will get some &rdquo;test Ada&rdquo; in your Preprod wallet.
                </Text>
              </>
            ) : (
              <Text>Your wallet is connected to to Preproduction Testnet.</Text>
            )}
          </>
        </SuccessComponent>
      </AssignmentComponent>
      <Link href="/modules/100/1002">
        <Button my="1em">Continue to Lesson 2</Button>
      </Link>
    </LessonLayout>
  );
}
