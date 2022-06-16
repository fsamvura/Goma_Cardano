module.exports = {
  client: {
    service: {
      name: 'ekival',
      // URL to the GraphQL API
      url: 'https://d.graphql-api.testnet.dandelion.link/',
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js'],
  },
}
