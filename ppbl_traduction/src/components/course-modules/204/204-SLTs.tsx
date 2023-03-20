import SLTsItems from "@/src/components/course-modules/SLTs";
import { Container, Divider, Heading, Box } from "@chakra-ui/react";
import React from "react";

const SLTs204 = () => {
  return (
    <Container maxWidth="90%" marginTop="2em">
      <SLTsItems moduleTitle="Module 204" moduleNumber={204} />
      <Divider mt="5" />
      <Box py="5">
        <Heading>About this Module</Heading>
      </Box>
    </Container>
  );
};

export default SLTs204;