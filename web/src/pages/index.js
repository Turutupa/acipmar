import { graphql, navigate } from "gatsby";
import React from "react";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ProjectPreviewGrid from "../components/project-preview-grid";
import Search from "../components/search";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { defaultCategory } from "../lib/constants";
import {
  filterOutDocsPublishedInTheFuture,
  filterOutDocsWithoutSlugs,
  groupBusinessesByCategories,
  mapEdgesToNodes
} from "../lib/helpers";
import "../styles/fuzzy-picker.css";

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    projects: allSanityBusiness(filter: { slug: { current: { ne: null } } }) {
      edges {
        node {
          id
          categories {
            title
          }
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
          }
          title
          excerpt
          discount
          slug {
            current
          }
        }
      }
    }
  }
`;

const IndexPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const businesses = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  const businessesByCategories = groupBusinessesByCategories(businesses);
  const businessCategories = Object.keys(businessesByCategories);

  // values for the select input
  const selectValues = businessCategories.map(category => ({
    value: category.toLowerCase(),
    label: category
  }));
  selectValues.unshift(defaultCategory);

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <Search
          category={defaultCategory.label}
          defaultCategory={defaultCategory}
          selectValues={selectValues}
        />

        {businessesByCategories && renderBusinesessByCategory(businessesByCategories)}
      </Container>
    </Layout>
  );

  function renderBusinesessByCategory(businessesByCategories) {
    return Object.keys(businessesByCategories).map(category => (
      <div key={category}>
        <ProjectPreviewGrid
          title={category}
          nodes={businessesByCategories[category]}
          currentCategory={"showAll"}
          browseMoreHref={() => navigate(`/category/${category}`)}
        />

        <hr
          style={{
            borderTop: "1px solid #d3d3d3"
          }}
        />
      </div>
    ));
  }
};

export default IndexPage;
