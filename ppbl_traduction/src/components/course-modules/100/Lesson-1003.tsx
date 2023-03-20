import AssignmentComponent from "@/src/components/lms/Lesson/AssignmentComponent";
import SuccessComponent from "@/src/components/lms/Lesson/SuccessComponent";
import SLT from "@/src/components/ui/Text/SLT";
import { Button, Grid, Stack, StackDivider, Text, Heading, GridItem, Divider, Link as CLink } from "@chakra-ui/react";
import Link from "next/link";
import LessonLayout from "../../lms/Lesson/LessonLayout";
import VideoComponent from "../../lms/Lesson/VideoComponent";

export default function Lesson1003() {
  return (
    <LessonLayout moduleNumber={100} sltId="100.3">
      <Grid mx="auto" fontWeight="bold" lineHeight="200%" templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem w="90%" mx="auto">
          <Text fontSize="lg" py="3">
            We think it&rsquo;s wonderful that this PPBL course can tell you that you&rsquo;ve mastered the first two SLTs. But
            &rdquo;Mastery&rdquo; cannot always be measured directly.
          </Text>
          <Text fontSize="lg" py="3">
            Blockchains require all of us to be careful keeping custody of private keys and mnemonic phrases, and you are the
            most important judge of whether or not you have mastered this learning target.
          </Text>
          <Text fontSize="lg" py="3">
            Join us for a conversation about wallet security at <CLink><Link href="/live-coding">Plutus PBL Live Coding</Link></CLink> on Thursday, 2023-03-16 at 1430
            UTC. This session will be recorded and posted to this lesson page.
          </Text>
        </GridItem>
        <GridItem>
          <VideoComponent videoId="aaaaa">Private Keys</VideoComponent>
        </GridItem>
      </Grid>
      <Divider py="5" />

      <AssignmentComponent>
        <Text py="2">When building on Cardano, there are a few different ways you will handle your keys.</Text>

        <Text py="2">
          For now, just make sure that your mnemonic words are written off-line, and that you have more than one secure
          copy.
        </Text>
        <Text py="2" width="70%">
          In Module 101, we will discuss key management on cardano-cli. In Module 201, we will investigate how keys can
          be stored in web applications, and you will learn how to hack Lesson 100.4.
        </Text>
        <SuccessComponent mastery={false}>You are confident that no one else can access your keys.</SuccessComponent>
      </AssignmentComponent>

      <Link href="/modules/100/1004">
        <Button my="1em">Continue to Lesson 4</Button>
      </Link>
    </LessonLayout>
  );
}
