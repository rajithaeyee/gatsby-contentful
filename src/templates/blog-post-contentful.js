import * as React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";

const BlogPostContentfulTemplate = ({
  //  allContentfulPost = { nodes: [] }
  data: { site = {}, contentfulPost = {}, } = {},
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`;

  if (!contentfulPost.title) {
    return <p>Error: Blog post data is unavailable.</p>;
  }

  return (
    <Layout location={location} title={siteTitle}>
      <article className="blog-post" itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{contentfulPost.title}</h1>
          <p>By {contentfulPost.author}</p>
        </header>
        <section>
          <div
            dangerouslySetInnerHTML={{
              __html: JSON.parse(contentfulPost.content.raw).value || "",
            }}
            itemProp="articleBody"
          />
        </section>
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
        </ul>
      </nav>
    </Layout>
  );
};

export const Head = ({ data: { contentfulPost = {} } = {} }) => {
  const title = contentfulPost.title || "Default Title";
  const description = contentfulPost.subtitle || "A blog post from Contentful";

  return <Seo title={title} description={description} />;
};

export default BlogPostContentfulTemplate;

export const pageQuery = graphql`
  query BlogPostContentfulBySlug{
    site {
      siteMetadata {
        title
      }
    }
    contentfulPost(slug: {eq: "creativity-is-essential"}) {
      title
      subtitle
      author
      content {
        raw
      }
      slug
    }
  }
`;
