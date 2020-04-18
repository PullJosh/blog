module.exports = {
  siteMetadata: {
    title: `Josh Pullen`,
    description: `I work on education and technology.`,
    author: `@PullJosh`,
    siteUrl: `https://joshuapullen.com/`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md", ".markdown"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              backgroundColor: "#fafafa",
              maxWidth: 1035
            }
          }
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Josh Pullen`,
        short_name: `Josh Pullen`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#4c51bf`,
        display: `minimal-ui`,
        icon: `src/images/josh-pullen-logo.webp` // This path is relative to the root of the site.
      }
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-59004745-3`,
        head: false
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            output: "/rss.xml",
            title: "Josh Pullen Blog RSS",
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return {
                  ...edge.node.frontmatter,
                  description: edge.node.excerpt,
                  url: `${site.siteMetadata.site_url}/blog/posts/${edge.node.frontmatter.slug}/`,
                  guid: `${site.siteMetadata.site_url}/blog/posts/${edge.node.frontmatter.slug}/`
                };
              });
            },
            query: `
              {
                allMdx(
                  filter: { frontmatter: { published: { ne: false } } }
                  sort: { fields: frontmatter___date, order: DESC }
                ) {
                  edges {
                    node {
                      body
                      excerpt(pruneLength: 190)
                      frontmatter {
                        slug
                        title
                        date(formatString: "MMMM D, YYYY")
                        machineDate: date
                        author
                      }
                    }
                  }
                }
              }
            `
          }
        ]
      }
    },
    `gatsby-plugin-force-trailing-slashes`
  ]
};
