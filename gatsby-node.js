exports.createPages = async function({ actions, graphql }) {
  const { data } = await graphql(`
    query MyQuery {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  const posts = data.allMdx.edges;

  // Individual posts
  posts.forEach(({ node }) => {
    const slug = node.frontmatter.slug;
    actions.createPage({
      path: `/blog/posts/${slug}`,
      component: require.resolve("./src/templates/blog-post.js"),
      context: { slug }
    });
  });

  // Posts list (pagination)
  const postsPerPage = 2;
  const numPages = Math.ceil(posts.length / postsPerPage);
  for (let i = 0; i < numPages; i++) {
    actions.createPage({
      path: i === 0 ? `/blog` : `/blog/page/${i + 1}`,
      component: require.resolve("./src/templates/posts-list.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage
      }
    });
  }
};
