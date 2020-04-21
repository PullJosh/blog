import React from "react";
import { graphql, Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Highlight, { defaultProps } from "prism-react-renderer";
import classNames from "classnames";

import { SEO } from "../components/SEO";
import { Layout } from "../components/Layout";
import { StyledContent } from "../components/StyledContent";

export default function BlogPost({ data }) {
  return (
    <Layout>
      <SEO
        title={data.mdx.frontmatter.title}
        description={data.mdx.excerpt.split("\n").join("")}
        meta={[
          {
            name: `twitter:image`,
            content: data.mdx.fields.socialImage.publicURL
          }
        ]}
      />
      <article className="mb-8 ContentArea">
        <time
          className="text-gray-700"
          dateTime={data.mdx.frontmatter.machineDate}
        >
          {data.mdx.frontmatter.date}
        </time>
        <h2 className="mb-2 text-3xl font-bold leading-tight text-gray-900">
          {data.mdx.frontmatter.title}
        </h2>
        <MDXProvider
          components={{
            h1: props => <h3 {...props} />,
            h2: props => <h4 {...props} />,
            h3: props => <h5 {...props} />,
            h4: props => <h6 {...props} />,
            h5: props => <h6 {...props} />,
            h6: props => <h6 {...props} />,
            pre: props => {
              // Matches language name plus, optionally, highlighted line(s)
              // Used like ```js:10-12 in markdown
              const detailsStr = props.children.props.className;
              const detailsReg = /language-(\w+)(?::(\d+)(?:-(\d+))?)?/;
              let [, language, startLine, endLine] = detailsStr.match(
                detailsReg
              );

              if (startLine !== undefined) startLine = parseInt(startLine);
              if (endLine !== undefined) endLine = parseInt(endLine);

              const lineIsHighlighted = lineNumber => {
                if (startLine === undefined) return false;
                if (lineNumber < startLine) return false;
                if (endLine === undefined) {
                  return lineNumber === startLine;
                } else {
                  return lineNumber <= endLine;
                }
              };

              return (
                <Highlight
                  {...defaultProps}
                  code={props.children.props.children.trim()}
                  language={language}
                >
                  {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps
                  }) => (
                    <pre className={className} style={style}>
                      {tokens.map((line, i) => {
                        const lineProps = getLineProps({ line, key: i });
                        return (
                          <div
                            {...lineProps}
                            className={classNames(lineProps.className, {
                              "prism-line-highlighted": lineIsHighlighted(i + 1)
                            })}
                          >
                            {line.map((token, key) => (
                              <span {...getTokenProps({ token, key })} />
                            ))}
                          </div>
                        );
                      })}
                    </pre>
                  )}
                </Highlight>
              );
            }
          }}
        >
          <StyledContent>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </StyledContent>
        </MDXProvider>
      </article>
      <div className="grid grid-cols-2 -mx-5">
        {data.nextMdx && <PostLink label="Next post" post={data.nextMdx} />}
        {data.prevMdx && <PostLink label="Previous post" post={data.prevMdx} />}
      </div>
    </Layout>
  );
}

function PostLink({ post, label }) {
  return (
    <Link
      to={`/blog/posts/${post.frontmatter.slug}/`}
      className="block px-5 py-4 mb-8 rounded-lg hover:bg-gray-200"
    >
      <article>
        <span className="block text-gray-700">{label}</span>
        <h3 className="text-lg font-semibold truncate">
          {post.frontmatter.title}
        </h3>
        <div>{post.excerpt}</div>
      </article>
    </Link>
  );
}

export const query = graphql`
  query($slug: String!, $prevSlug: String, $nextSlug: String) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        machineDate: date
        author
      }
      fields {
        socialImage {
          publicURL
        }
      }
    }
    nextMdx: mdx(frontmatter: { slug: { eq: $nextSlug } }) {
      excerpt(pruneLength: 70)
      frontmatter {
        slug
        title
        date(formatString: "MMMM D, YYYY")
        machineDate: date
        author
      }
    }
    prevMdx: mdx(frontmatter: { slug: { eq: $prevSlug } }) {
      excerpt(pruneLength: 70)
      frontmatter {
        slug
        title
        date(formatString: "MMMM D, YYYY")
        machineDate: date
        author
      }
    }
  }
`;
