import {
  Box,
  Text,
  Heading,
  Stack,
  UnorderedList,
  ListItem,
  ListIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
} from "@chakra-ui/react";
import * as React from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";

import slts from "@/src/data/slts-english.json";
// import slts from "@/src/data/slts-indonesian.json";

import Link from "next/link";

const ModuleListWithSLTs = () => {
  return (
    <Accordion allowMultiple>
      {slts.modules.map((module) => (
        <AccordionItem key={module.number} bg="theme.lightGray" color="white" p="2" my="2">
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Heading size="md" py="2" style={{ display: "inline-flex" }}>
                <Text color="theme.blue" mr="4">
                  {module.number} :
                </Text>
                {module.title}
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Link href={`/modules/${module.number}/slts`}>
              <Text pb="2" color="theme.yellow">
                Go to Module {module.number}
              </Text>
            </Link>
            <Divider />
            <Text fontWeight="bold" py="2">
              Student Learning Targets:
            </Text>
            <UnorderedList>
              {module.slts.map((slt) => (
                <ListItem key={slt.id} py="1">
                  {slt.id}: {slt.slt}
                </ListItem>
              ))}
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ModuleListWithSLTs;
