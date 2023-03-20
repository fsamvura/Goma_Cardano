import { Box, Text } from "@chakra-ui/react";

export const StatusBox = ({ condition, text }: { condition: boolean; text: string }) => {
    return (
      <Box
        bg={condition ? "theme.green" : "theme.yellow"}
        color={condition ? "theme.lightGray" : "black"}
        w="100%"
        p="2"
        fontSize="md"
        >
          <Text>{text}</Text>
      </Box>

    );
  };