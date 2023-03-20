import SLTsItems from "@/src/components/course-modules/SLTs";
import { Container, Divider, Heading, Box, Text, Button, Link as CLink } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const SLTs100 = () => {
  return (
    <Container maxWidth="75%" marginTop="2em">
      <SLTsItems moduleTitle="Module 100" moduleNumber={100} />
      <Divider my="5" />
      <Box bg="theme.lightGray" p="5">
        <Heading>Welcome to Plutus PBL 2023!</Heading>
        <Text py="3" fontSize="lg">
          The purpose of this module is to give you an example of how this course works.
        </Text>
        <Text py="3" fontSize="lg">
          <Text as="span" fontWeight="900" color="theme.green">
            PBL
          </Text>{" "}
          stands for{" "}
          <Text as="span" fontWeight="900" color="theme.green">
            Project-Based Learning
          </Text>
          . Projects allow us to{" "}
          <Text as="span" fontWeight="900" color="theme.green">
            learn by doing
          </Text>
          .
        </Text>
        <Text py="3" fontSize="lg">
          Every Module in PPBL starts with a list of Student Learning Targets (SLTs), as shown above.
        </Text>
        <Text py="3" fontSize="lg">
          In this module, you will start to see some different ways to think about &rdquo;Mastery&rdquo; of each SLT.
        </Text>
        <Text py="3" fontSize="lg">
          At the top of the page there is a status bar that corresponds to these SLTs. You will see how this works in{" "}
          <CLink>
            <Link href="/modules/100/1001">Lesson 1</Link>
          </CLink>
          .
        </Text>
        <Text py="3" fontSize="lg">
          We will continue to show you around in the next few lessons.
        </Text>
        <Text py="3" fontSize="lg">
          For now, use the sidebar to navigate to Lesson 1, or tap the button below.
        </Text>
        <Link href="/modules/100/1001">
          <Button my="1em">I am ready for Lesson 1!</Button>
        </Link>
      </Box>
    </Container>
  );
};

export default SLTs100;
