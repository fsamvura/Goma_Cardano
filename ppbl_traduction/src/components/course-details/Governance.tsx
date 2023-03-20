import { Button, Container, Divider, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Governance = () => {
  return (
    <Container maxWidth="80%" marginLeft="1em" marginTop="2em">
      <Heading size="2xl" color="theme.blue">
        Beyond Contibution is Goverance
      </Heading>
      <Text fontSize="xl" marginTop="1em">
        Our intention is for you be more than a Contributor to projects.
      </Text>
      <Text fontSize="xl" marginTop="1em">
        We want you to be a decision maker, who helps answer the question:
      </Text>

      <Heading size="4xl" color="theme.green" my="1em">
        &rdquo;What will we do next?&rdquo;
      </Heading>
      <Text fontSize="xl" my="1em">
        We believe that when people are educated, they are better prepared to make decisions.
      </Text>
      <Text fontSize="xl" my="1em">
        We believe that the best way to get educated is by doing things.
      </Text>
      <Text fontSize="xl" my="1em">
        So let&rsquo;s get started.
      </Text>
      <Link href="/modules/100">
        <Button my="1em">Get Started with Module 100</Button>
      </Link>
    </Container>
  );
};

export default Governance;
