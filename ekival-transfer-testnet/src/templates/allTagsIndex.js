import React from "react";
import { graphql, Link } from "gatsby";
import { Box, Text, Heading, Button, Center, Flex } from "@chakra-ui/react";

const AllTagsTemplate = ({data, pageContext}) => {
    const { tags } = pageContext
    console.log(tags)
    return (
        <Flex w='full' direction='column' p='10' bg='white'>
            <Heading>
                List of Bounty Tags
            </Heading>
            {tags.map(tagName => {
                return (
                    <Link to={`/tags/${tagName}`}>
                        <Box w='50%' m='3' p='3' bg='gl-yellow'>{tagName}</Box>
                    </Link>
                )
            })}
        </Flex>
    )
}

export default AllTagsTemplate