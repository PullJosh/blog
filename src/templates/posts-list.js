import React from "react";
import { graphql, Link } from "gatsby";

import { Layout } from "../components/Layout";
import { StyledContent } from "../components/StyledContent";
import { SEO } from "../components/SEO";

export default function PostsList({ data }) {
  return (
    <Layout>
      <SEO title="Blog" description="Thoughts on education and technology." />
      {data.allMdx.edges.map(({ node }) => {
        return (
          <Link
            className="block px-5 py-4 mb-8 -mx-5 -my-4 rounded-lg hover:bg-gray-200"
            to={`/blog/posts/${node.frontmatter.slug}/`}
          >
            <time
              className="text-gray-700"
              dateTime={node.frontmatter.machineDate}
            >
              {node.frontmatter.date}
            </time>
            <h2 className="text-3xl font-bold text-gray-900">
              {node.frontmatter.title}
            </h2>
            <StyledContent>{node.excerpt}</StyledContent>
          </Link>
        );
      })}
      <div className="flex items-center ContentArea">
        <span className="w-1/3 text-left">
          {data.allMdx.pageInfo.hasPreviousPage && (
            <Link
              className="text-indigo-700"
              to={
                data.allMdx.pageInfo.currentPage - 1 === 1
                  ? `/blog/`
                  : `/blog/page/${data.allMdx.pageInfo.currentPage - 1}/`
              }
            >
              ← Newer posts
            </Link>
          )}
        </span>
        <span className="w-1/3 text-sm text-center text-gray-600">
          Page {data.allMdx.pageInfo.currentPage} of{" "}
          {data.allMdx.pageInfo.pageCount}
        </span>
        <span className="w-1/3 text-right">
          {data.allMdx.pageInfo.hasNextPage && (
            <Link
              className="text-indigo-700"
              to={`/blog/page/${data.allMdx.pageInfo.currentPage + 1}/`}
            >
              Older posts →
            </Link>
          )}
        </span>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMdx(
      filter: { frontmatter: { published: { ne: false } } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
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
      pageInfo {
        currentPage
        pageCount
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;
