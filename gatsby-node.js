const {
  createFilePath,
  createFileNodeFromBuffer
} = require("gatsby-source-filesystem");
const generateCardImage = require("./generateCardImage");

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
  posts.forEach(({ node }, index) => {
    const slug = node.frontmatter.slug;
    actions.createPage({
      path: `/blog/posts/${slug}`,
      component: require.resolve("./src/templates/blog-post.js"),
      context: {
        slug,
        prevSlug: posts[index + 1]
          ? posts[index + 1].node.frontmatter.slug
          : null,
        nextSlug: posts[index - 1]
          ? posts[index - 1].node.frontmatter.slug
          : null
      }
    });
  });

  // Posts list (pagination)
  const postsPerPage = 5;
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

exports.onCreateNode = async ({
  node,
  actions,
  getNode,
  createNodeId,
  cache
}) => {
  const { createNodeField, createNode } = actions;

  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: node.frontmatter.slug,
      node,
      value
    });

    const socialCardImageCanvas = await generateCardImage(
      node.frontmatter.title
    );

    const socialImageNode = await createFileNodeFromBuffer({
      buffer: socialCardImageCanvas.toBuffer(),
      name: "card",
      createNode,
      createNodeId,
      cache
    });

    createNodeField({
      name: "socialImage___NODE",
      node,
      value: socialImageNode.id
    });
  }
};
