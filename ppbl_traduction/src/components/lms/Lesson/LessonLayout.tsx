
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    GridItem,
    Heading,
    ListItem,
    OrderedList,
    Stack,
    StackDivider,
    Text,
} from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";

import SLT from "@/src/components/ui/Text/SLT";

// Props
// SLT
// children
// Next Lesson?


type Props = {
    children?: React.ReactNode;
    moduleNumber: number;
    sltId: string;
  };

const LessonLayout: React.FC<Props> = ({ children, moduleNumber, sltId }) => {

  return (
    <>
      <Box w="90%" marginLeft="1em" marginTop="2em">
        <SLT moduleNumber={moduleNumber} id={sltId} />
        <Divider py="5" />

        {children}
        {/* Navigation buttons in progress */}
        {/* <Divider />
        <Link href="/modules/100/1002">
          <Button my="1em">Continue to Lesson 2</Button>
        </Link> */}
      </Box>
    </>
  );
}

export default LessonLayout
