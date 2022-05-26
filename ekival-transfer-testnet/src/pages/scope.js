import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import Wallet from "../cardano/wallet";
import { fromAscii, fromHex } from "../utils/converter";
import { Flex, Center, Heading, Text, Box } from "@chakra-ui/react";

const ScopePage = () => {
  const connected = useStoreState((state) => state.connection.connected);

  return (
    <>
      <title>gimbal scope</title>
      <Flex w='100%' mx='auto' direction='column' wrap='wrap' bg='gl-yellow'>
          <Box w='50%' mx='auto' my='5'>
            <Heading size='2xl' color='gl-blue' fontWeight='medium'>Scope</Heading>
            <Text py='3'>
              Next step: add to points below a graphic, with quantitative data
            </Text>
            <Heading size='xl' color='gl-blue' fontWeight='medium' py='3'>This Project</Heading>
            <Text py='3'>
              Bounties to contribute to this proof-of-concept
            </Text>
            <Heading size='xl' color='gl-blue' fontWeight='medium' py='3'>Personal allocation of Gimbals</Heading>
            <Text py='3'>
              Sharing responsibility and increasing transparency
            </Text>
            <Heading size='xl' color='gl-blue' fontWeight='medium' py='3'>Group Allocations</Heading>
            <Text py='3'>
              Working Groups are forming and taking on projects and tasks. This project might serve as a launching point for Group work. For example, the Technical Group might choose to extend what is now a proof-of-concept into something scalable.
            </Text>
            <Heading size='xl' color='gl-blue' fontWeight='medium' py='3'>Gimbalabs Community Allocation</Heading>
            <Text py='3'>
              Sharing existing Gimbalabs projects - there will be some overlap between this and "personal" bounties.
            </Text>
          </Box>
      </Flex>
    </>
  )
}

export default ScopePage;
