module.exports = {
  siteMetadata: {
    siteUrl: "https://gimbals.workshopmaybe.com",
    title: "Gimbal Bounty Experiment",
    description: "Proof of Concept",
  },
  plugins: [
    "gatsby-transformer-sharp",
    "@chakra-ui/gatsby-plugin",
    {
      resolve: "gatsby-plugin-apollo",
      options: {
        uri: "https://d.graphql-api.testnet.dandelion.link/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "bounties",
        path: `${__dirname}/src/bounties`,
      },
    },
    "gatsby-transformer-remark",
  ],
};
