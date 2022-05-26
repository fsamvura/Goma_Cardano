import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Heading, Text, Box } from "@chakra-ui/react";

const TitleAndDescription = ({data}) => {
    const title = data.site.siteMetadata.title
    const description = data.site.siteMetadata.description

    return(
        <Box>
            <Heading>{title}</Heading>
            <Text>{description}</Text>
        </Box>
    )
}

const Description = () => {
    return (
        <StaticQuery
            query={graphql`
                query {
                    site {
                        siteMetadata {
                            title
                            description
                        }
                    }
                }
            `}
            render={data => <TitleAndDescription data={data} />}
        />
    )
}

export default Description