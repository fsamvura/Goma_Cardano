import SLTsItems from "@/src/components/course-modules/SLTs";
import { Container, Divider, Heading, Box } from "@chakra-ui/react";
import React from "react";

const SLTs301 = () => {
  return (
    <Container maxWidth="90%" marginTop="2em">
      <SLTsItems moduleTitle="Module 301" moduleNumber={301} />
      <Divider mt="5" />
      <Box py="5">
        <Heading>About this Module</Heading>
      </Box>
    </Container>
  );
};

export default SLTs301;