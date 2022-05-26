import React, { useEffect, useState } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import { Heading, Text, Box, List, ListIcon, ListItem, UnorderedList } from "@chakra-ui/react";
import { getTxsFromAddress } from "../../hooks/getTxsFromAddress";

const OutgoingOutputs = (outputs) => {
    let result = []
    outputs.forEach(output => {
        if (output.address != "addr1qy3xh5h4gjt6z69jqvrt04l0g2d82h4s6cf0xvu7t2nz95j6jnltpt22t0myhsuk9s6lyn74yxmlxakt27ylr9ykh30qz97lf8") {
            result.push(output)
        }
    })

    return result
}

const OutputCard = (output) => {
    return (
        <Box w='50%' bg='gl-blue' color='white' m='1' p='1' fontSize='sm' boxShadow='lg' rounded='md'>
            <Text p='1' fontSize='xs'>
                Sent to: {output.address}
            </Text>
            <Text p='1'>
                {OutputGimbals(output.tokens)} Gimbals + {output.value / 1000000} ADA
            </Text>
        </Box>
    )
}

const OutputGimbals = (tokens) => {
    let gimbals = 0
    tokens.forEach(token => {
        if (token.asset.policyId == "2b0a04a7b60132b1805b296c7fcb3b217ff14413991bf76f72663c30") {
            gimbals = token.quantity / 1000000
        }
    })

    return gimbals
}

const TxCard = (props) => {
    const { hash, includedAt, metadata, outputs } = props.tx;
    let slug = null
    if (metadata[0]?.key == "1618") {
        slug = metadata[0].value
    }
    const bountyOutputs = OutgoingOutputs(outputs)

    return (
        <>
            {slug ? (
                <Box w='50%' m='3' p='3' bg='gl-green'>
                    <Link to={`/bounties/${slug}`}>
                        <Heading>Bounty: {slug}</Heading>
                    </Link>
                    <Text>
                        Next Step: pull title + any necessary details from frontmatter
                    </Text>
                    <a href={`https://cardanoscan.io/transaction/${hash}`} target='_blank'>
                        <Text fontSize='xs' py='1'>Transaction: {hash} (click to view)</Text>
                    </a>
                    <Text fontSize='xs' py='1'>Date: {includedAt}</Text>
                    {bountyOutputs.map(i => OutputCard(i))}
                </Box>
            ) : (null)}
        </>
    )
}

export default TxCard


//     return(
//         <Box border='solid' p='3' my='2'>
//             <Text>{tx.hash}</Text>
//             <Text>{tx.includedAt}</Text>
//             <Text>{tx.metadata[0]?.value}</Text>
//             {tx.outputs.map(i => {
//                 return(
//                     <Box w="40%" m='2' p='2' fontSize='sm'>
//                         <Text>{i.address}</Text>
//                         <Text>{i.value}</Text>
//                         <Text>{JSON.stringify(i.tokens)}</Text>
//                     </Box>
//                 )
//             })}
//         </Box>
//     )
// })