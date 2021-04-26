import { graphql, navigate } from "gatsby";
import React from "react";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ProjectPreviewGrid from "../components/project-preview-grid";
import Search from "../components/search";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { defaultCategory } from "../lib/constants";

export const query = graphql`
  query CategoryTemplateQuery($category: String!) {
    allSanityCategory {
      edges {
        node {
          title
        }
      }
    }
    allSanityBusiness(filter: { categories: { elemMatch: { title: { eq: $category } } } }) {
      totalCount
      edges {
        node {
          id
          title
          excerpt
          discount
          slug {
            current
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
          slug {
            current
          }
        }
      }
    }
  }
`;

const CategoryTemplate = props => {
  const { data, errors, pageContext } = props;
  const business = data && data.allSanityBusiness;
  const nodes = [...business.edges].map(node => {
    return { ...node.node };
  });
  const selectValues =
    data &&
    data.allSanityCategory.edges.map(edge => {
      return {
        value: edge.node.title.toLowerCase(),
        label: edge.node.title
      };
    });
  selectValues.unshift(defaultCategory);
  const category = pageContext.category;

  return (
    <Layout navigate={() => navigate("/")} title={category}>
      {errors && <SEO title="GraphQL Error" />}
      {business && <SEO title={category} />}
      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {business && nodes && nodes.length > 0 && (
        <Container>
          <Search
            category={category}
            defaultCategory={defaultCategory}
            selectValues={selectValues}
          />

          <ProjectPreviewGrid title={category} nodes={nodes} showAll />
        </Container>
      )}
    </Layout>
  );
};

export default CategoryTemplate;
