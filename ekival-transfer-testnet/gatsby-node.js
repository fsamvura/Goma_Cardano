const path = require('path')

const createTagPages = (createPage, bounties) => {
    const allTagsIndexTemplate = path.resolve('src/templates/allTagsIndex.js')
    const singleTagIndexTemplate = path.resolve('src/templates/singleTagIndex.js')

    const bountiesByTag = {}

    bounties.forEach(({node}) => {
        if (node.frontmatter.tags) {
            node.frontmatter.tags.forEach(tag => {
                if(!bountiesByTag[tag]) {
                    bountiesByTag[tag] = []
                }

                bountiesByTag[tag].push(node)
            })
        }
    })

    const tags = Object.keys(bountiesByTag)

    createPage({
        path: '/tags',
        component: allTagsIndexTemplate,
        context: {
            tags: tags.sort()
        }
    })

    tags.forEach(tagName => {
        const bounties = bountiesByTag[tagName]

        createPage({
            path: `/tags/${tagName}`,
            component: singleTagIndexTemplate,
            context: {
                bounties,
                tagName
            }
        })
    })
}

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        experiments: {
            asyncWebAssembly: true,
        },
    });
};

exports.createPages = (({ graphql, actions }) => {
    const { createPage } = actions

    return new Promise((resolve, reject) => {
        const bountyPage = path.resolve('src/templates/bountyPage.js')

        resolve(
            graphql(
                `
                    query {
                        allMarkdownRemark (
                            sort: {order: ASC, fields: [frontmatter___slug]}
                        ) {
                            edges {
                                node {
                                    frontmatter {
                                        slug
                                        title
                                        tags
                                    }
                                }
                            }
                        }
                    }
                  `
            ).then(result => {
                const bounties = result.data.allMarkdownRemark.edges

                createTagPages(createPage, bounties)

                bounties.forEach(({ node }, index) => {
                    const slug = node.frontmatter.slug
                    createPage({
                        path: `/bounties/${slug}`,
                        component: bountyPage,
                        context: {
                            pathSlug: slug,
                            prev: index === 0 ? null : bounties[index - 1].node,
                            next: index === (bounties.length - 1) ? null : bounties[index + 1].node
                        }
                    })

                    resolve()
                })
            })
        )
    })
})