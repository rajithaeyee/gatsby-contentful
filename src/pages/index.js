import * as React from "react";
import { Link, graphql } from "gatsby";
import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const articles = data.allContentfulBlogArticles.nodes;
  if (articles?.length === 0) {
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
      <ol style={{
        listStyle: 'none',
        padding: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {articles?.map(article => {
          const title = article.title || article.slug;

          return (
            <li key={article.slug} style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <img
                src={`https:${article.cover.file.url}`}
                alt={article.title || "Article Cover"}
                style={{ width: '100%', height: '8rem', objectFit: 'cover' }}
              />
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
                style={{ padding: '1rem' }}
              >
                <header style={{ marginBottom: '1rem' }}>
                  <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 600 }}>
                    <Link
                      to={`/${article.slug}`}
                      itemProp="url"
                      style={{ textDecoration: 'none', color: '#333' }}
                    >
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                </header>
                <section style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  {article.summary}
                </section>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export const Head = () => <Seo title="All Articles" />;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogArticles(filter: {node_locale: { eq: "en-US" }}) {
      nodes {
      id
      title
      slug
      summary
      details{
        raw
      }
      author
      cover{file{url}}
      }
    }
  }
`;

export default BlogIndex;
