import { Box, Container, Divider, Heading, List, ListItem, Text, Flex } from "@chakra-ui/react";
import React from "react";
import slts from "@/src/data/slts-english.json";
// import slts from "@/src/data/slts-indonesian.json";


interface SLT {
  id: string;
  slt: string;
}

interface SLTsItemsProps {
  moduleTitle: string;
  moduleNumber: number;
}

const SLTsItems = ({ moduleTitle, moduleNumber }: SLTsItemsProps) => {
  const currentModule = slts.modules.filter((module) => module.number == moduleNumber)[0]
  const items: SLT[] = currentModule.slts

  return (
    <Box>

      <Heading size="md" fontWeight="thin" pt="5">PPBL Module {currentModule.number}</Heading>
      <Heading size="2xl" color="theme.blue">{currentModule.title}</Heading>
      <Text pb="5">Release Date: {currentModule.releaseDate} | Updated: {currentModule.updatedDate}</Text>
      <Divider />
      <Heading>Student Learning Targets</Heading>

        <List lineHeight="2">
            {items.map((item, index) => {
                const [id, SLT] = [item.id, item.slt];
                return (
                <ListItem key={id}>
                    <Flex fontSize="xl" fontWeight="bold" style={{ display: 'inline-flex' }}>
                    <Text color="theme.blue" style={{ marginRight: 4 }}>{id}</Text>
                    <Text> : {SLT}</Text>
                    </Flex>
                </ListItem>
                );
            })}
        </List>
    </Box>
  );
};

export default SLTsItems;