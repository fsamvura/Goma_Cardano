import React, { useEffect, useState } from "react";
import { StaticQuery, graphql } from "gatsby";
import { Heading, Text, Box, List, ListIcon, ListItem, UnorderedList } from "@chakra-ui/react";
import { getTxsFromAddress } from "../../hooks/getTxsFromAddress";
import TxCard from "./TxCard";


const Complete = () => {
    const {
        txs,
        getTxs,
        loading: txsLoading,
        error,
    } = getTxsFromAddress();

    useEffect(() => {
        getTxs({
            variables: {
              addr: "addr1qy3xh5h4gjt6z69jqvrt04l0g2d82h4s6cf0xvu7t2nz95j6jnltpt22t0myhsuk9s6lyn74yxmlxakt27ylr9ykh30qz97lf8",
            },
          });
    }, [txsLoading])

    return (
        <Box mx='auto' my='10' p='5' bg="white" w='80%'>
            <Heading>Completed Bounties</Heading>
            <Text>Next steps:</Text>
            <UnorderedList ml='10'>
                <ListItem>
                    What is essential to report in a completed transaction?
                </ListItem>
                <ListItem>
                    Use PPBL Escrow Contract to lock gimbals when someone commits to a Bounty. This case raises some particular concerns that are helpful to our broader understanding of essential Escrow. (Link to Miro that has notes)
                </ListItem>
            </UnorderedList>

            <Box>
                {txsLoading ?
                    "loading"
                :
                    (txs?.transactions.map(tx => <TxCard tx={tx} />))
                }
            </Box>
        </Box>
    )
}


export default Complete