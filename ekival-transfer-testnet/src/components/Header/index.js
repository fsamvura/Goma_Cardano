import React from "react";
import { Link } from "gatsby"
import { useStoreState } from "easy-peasy";
import { Box, Flex, Spacer } from "@chakra-ui/react";

import WalletButton from "../WalletButton/WalletButton";


const Header = () => {
    const connected = useStoreState((state) => state.connection.connected);

    return (
        <Box id="header" w='full' mx='auto' p='5' bg='gl-blue' color='white'>
            <Flex direction='row' align='center' justify='center'>
                <Box my='1' fontWeight='bold'>
                    <Link to="/">Home</Link>
                </Box>
                <Spacer />
                <Box my='1' fontWeight='bold'>
                    <Link to="/treasury">Lock</Link>
                </Box>
                <Spacer />
                {/* <Box my='1' fontWeight='bold'>
                    <Link to="/bounties">Bounties</Link>
                </Box>
                <Spacer />
                <Box my='1' fontWeight='bold'>
                    <Link to="/tags">Tags</Link>
                </Box>
                <Spacer />
                <Box my='1' fontWeight='bold'>
                    <Link to="/scope">Scope</Link>
                </Box>
                <Spacer /> */}
                <Box my='1' fontWeight='bold'>
                    <Link to="/distribute">Unlock</Link>
                </Box>
                <Spacer />
                <WalletButton />
            </Flex>
        </Box>
    )
}

export default Header;