import * as React from "react";
import { graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";

const BlogPostContentfulTemplate = ({
  data: { site = {}, contentfulBlogArticles = {} } = {},
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`;

  if (!contentfulBlogArticles.title) {
    return <p>Error: Blog post data is unavailable.</p>;
  }

  return (
<Layout location={location} title={siteTitle}>
  <article 
    className="blog-post" 
    itemScope 
    itemType="http://schema.org/Article" 
    style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }}
  >
    <header style={{ marginBottom: "2rem" }}>
      <h1 
        itemProp="headline" 
        style={{
          fontSize: "2.5rem",
          marginBottom: "0.5rem",
          color: "#333",
        }}
      >
        {contentfulBlogArticles.title}
      </h1>
      <p 
        style={{
          fontSize: "1rem",
          color: "#666",
          margin: 0,
        }}
      >
        By <strong>{contentfulBlogArticles.author}</strong>
      </p>
    </header>

    {contentfulBlogArticles.cover && (
      <div style={{ marginBottom: "1.5rem" }}>
        <img
          src={contentfulBlogArticles.cover.file.url}
          alt={contentfulBlogArticles.title}
          style={{
            maxWidth: "100%",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
    )}

    <section 
      style={{
        fontSize: "1.1rem",
        lineHeight: "1.8",
        color: "#444",
        marginBottom: "2rem",
      }}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: JSON.parse(contentfulBlogArticles.details.raw).content[0].content[0].value || "",
        }}
        itemProp="articleBody"
      />
    </section>

    <hr style={{ margin: "2rem 0", borderTop: "1px solid #ddd" }} />

    <footer style={{ textAlign: "center" }}>
      <Bio />
    </footer>
  </article>

  <nav 
    className="blog-post-nav" 
    style={{ 
      maxWidth: "800px", 
      margin: "2rem auto", 
      display: "flex", 
      justifyContent: "space-between", 
      listStyle: "none",
      padding: 0 
    }}
  >
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        listStyle: "none",
        padding: 0,
        width: "100%",
      }}
    >
      {/* skipped the navigation for demo.. */}
    </ul>
  </nav>
</Layout>
  );
};

export const Head = ({ data: { contentfulBlogArticle = {} } = {} }) => {
  const title = contentfulBlogArticle.title || "Default Title";
  const description = "A blog post from Contentful";

  return <Seo title={title} description={description} />;
};

export default BlogPostContentfulTemplate;

export const pageQuery = graphql`
  query BlogArticleContentfulBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogArticles(slug: { eq: $slug }) {
      title
      author
      details {
        raw
      }
      cover {
        file {
          url
        }
      }
    }
  }
`;
