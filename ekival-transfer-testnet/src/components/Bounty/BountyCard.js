import React, { useEffect, useState } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import { Heading, Text, Box, Flex } from "@chakra-ui/react";

const BountyCard = (props) => {
    const frontmatter = props.info

    let bountyColor = 'gl-yellow'
    if(frontmatter.tags.includes("Committed")) {bountyColor = 'red.200'}
    if(frontmatter.tags.includes("Complete")) {bountyColor = 'gl-green'}

    return (
            <Link to={frontmatter.slug}>
                <Flex w='100%' p='3' bg={bountyColor} key={frontmatter.slug}>
                    <Box w='60%'>
                        <Heading size='md'>
                            {frontmatter.title}
                        </Heading>
                        <Heading size='sm' py='1'>
                            {frontmatter.slug}
                        </Heading>
                        <Text>
                            {frontmatter.date}
                        </Text>
                        <Text>
                            {frontmatter.scope}
                        </Text>
                    </Box>
                    <Flex direction='column' w='50%' ml='10'>
                        <Box>
                            Status: {frontmatter.tags.map(tag => <Text>{tag}</Text>)}
                        </Box>
                        <Box bg='white' mt='5' p='1' w='100%'>
                            <Text fontSize='lg'>
                                {frontmatter.gimbals} gimbals
                            </Text>
                            <Text>
                                + {frontmatter.ada} ada
                            </Text>
                        </Box>

                    </Flex>
                </Flex>
            </Link>
    )
}

export default BountyCard