import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Business from "../components/business";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query ProjectTemplateQuery($id: String!) {
    business: sanityBusiness(id: { eq: $id }) {
      id
      location
      twitter
      facebook
      instagram
      phoneNumber
      categories {
        _id
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
        alt
      }
      title
      slug {
        current
      }
      _rawBody
    }
  }
`;

const ProjectTemplate = props => {
  const { data, errors } = props;
  const business = data && data.business;
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {business && <SEO title={business.title || "Untitled"} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {business && <Business {...business} />}
    </Layout>
  );
};

export default ProjectTemplate;
