import React from "react";
import { graphql, Link } from "gatsby";
import { Box, Text, Heading, Button, Center, Flex } from "@chakra-ui/react";

const SingleTagTemplate = ({data, pageContext}) => {
    const { bounties, tagName} = pageContext
    return (
        <Flex w='full' direction='column' p='10' bg='white'>
            <Heading>{`${tagName}`} Bounties</Heading>

            {bounties.map((bounty, index) => {
                return (
                    <Box bg='gl-yellow' m='3' p='3' w='50%' key={index}>
                        <Link to={`/bounties/${bounty.frontmatter.slug}`}>
                            {bounty.frontmatter.title}
                        </Link>
                    </Box>
                )
            })}

        </Flex>
    )
}

export default SingleTagTemplate