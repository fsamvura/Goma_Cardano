import React from "react";
import { graphql, Link } from "gatsby";
import Description from "../../components/Bounty/Description";
import Complete from "../../components/Bounty/Complete";
import BountyCard from "../../components/Bounty/BountyCard";
import { Box, Text, Heading, Grid, GridItem, UnorderedList, ListItem } from "@chakra-ui/react";

const Bounties = ({ data }) => {
    const { edges } = data.allMarkdownRemark
    console.log(edges)
    return (
        <>
            <Box mx='auto' my='10' p='5' bg="white" w='80%'>
                <Description />
                <Text>
                    Next Steps:
                </Text>
                <UnorderedList ml='10'>
                    <ListItem>Use new bounty card component on Tag lists, for example</ListItem>
                    <ListItem>Add dynamic tag rendering, sorting to this page</ListItem>
                </UnorderedList>
                <Grid mt='5' templateColumns='repeat(3, 1fr)' gap='4'>
                    {edges.map(edge => {
                        const { frontmatter } = edge.node
                        return (
                            <BountyCard info={frontmatter} />
                        )
                    })}
                </Grid>
            </Box>
            <Complete />
        </>
    )
}

// Add a toggle for sort order

export const query = graphql`
    query BountyListQuery {
        allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___slug]}
        ) {
            edges {
                node {
                    frontmatter {
                        title
                        slug
                        date
                        tags
                        ada
                        gimbals
                        scope
                    }
                }
            }
        }
    }
`

export default Bounties
