import { Box, Text, Heading, Center, Badge, Flex, Spacer, Divider } from "@chakra-ui/react";
import * as React from "react";

type Props = {
  children?: React.ReactNode;
  mastery: boolean;
};
const SuccessComponent: React.FC<Props> = ({ children, mastery }) => {
  return (
    <Box my="3" py="3" bg="theme.lightGray" color="white">
      <Center>
        <Heading size="md">Mastery Status:</Heading>
        {mastery ? (
          <Badge ml="5" fontSize="lg" bg="theme.green">
            <Text size="md">Success!</Text>
          </Badge>
        ) : (
          <Badge ml="5" fontSize="lg" bg="theme.yellow" color="theme.dark">
            <Text size="md">in progress</Text>
          </Badge>
        )}
      </Center>
      <Center>
        <Text fontSize="lg" py="3">
          {children}
        </Text>
      </Center>
    </Box>
  );
};

export default SuccessComponent;
