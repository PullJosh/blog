module.exports = {
  siteMetadata: {
    title: `Josh Pullen`,
    description: `I work on education and technology.`,
    author: `@PullJosh`
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
    `gatsby-plugin-force-trailing-slashes`
  ]
};
