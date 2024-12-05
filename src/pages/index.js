import * as React from "react";
import { Link, graphql } from "gatsby";
import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allContentfulPost.nodes;

  if (posts?.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>No blog posts found. Add blog posts to Contentful.</p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts?.map(post => {
          const title = post.title || post.slug;

          return (
            <li key={post.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={`/${post.slug}`} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                 
                </header>
                <section>
                  {/* <p
                    dangerouslySetInnerHTML={{
                      __html: post.description?.childMarkdownRemark.html || post.excerpt,
                    }}
                    itemProp="description"
                  /> */}
                </section>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export const Head = () => <Seo title="All posts" />;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost {
      nodes {
        slug
        title
      }
    }
  }
`;

export default BlogIndex;
