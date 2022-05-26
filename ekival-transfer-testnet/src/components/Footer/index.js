import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
    return(
        <Flex id='footer' width='100%' py='10' justify='center' bg='gl-green' color='gl-blue'>
            <Text>A project of Gimbalabs</Text>
        </Flex>
    )
}

export default Footer;