import AssignmentComponent from "@/src/components/lms/Lesson/AssignmentComponent";
import SuccessComponent from "@/src/components/lms/Lesson/SuccessComponent";
import VideoComponent from "@/src/components/lms/Lesson/VideoComponent";
import SLT from "@/src/components/ui/Text/SLT";
import { Box, Grid, Stack, StackDivider, Text } from "@chakra-ui/react";
import { CardanoWallet, useAddress, useNetwork, useWallet } from "@meshsdk/react";

export default function Lesson1011() {
    const { connected, wallet } = useWallet();
    const address = useAddress();
    const network = useNetwork();

    return (
        <Stack maxWidth="80%" marginLeft="1em" marginTop="2em" divider={<StackDivider borderColor="theme.three" />}>
        {/* <SLT id="101.1">I can compile a plutus validator to Untyped Plutus Core (UPLC).</SLT> */}
        <Grid templateColumns="repeat(2, 1fr)" gap={10}>
          <AssignmentComponent>
            <Text>Assignment description goes here</Text>
          </AssignmentComponent>
          <SuccessComponent mastery={connected && network == 0}>Success message goes here</SuccessComponent>
        </Grid>

        <VideoComponent videoId="aa">Placeholder Video (for demo)</VideoComponent>
      </Stack>
    );
  }
