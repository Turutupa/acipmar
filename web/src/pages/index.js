import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
  groupBusinessesByCategories
} from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ProjectPreviewGrid from "../components/project-preview-grid";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    projects: allSanityBusiness(limit: 6, filter: { slug: { current: { ne: null } } }) {
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
            alt
          }
          title
          _rawExcerpt
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
  const [selectedCategories, setSelectedCategories] = React.useState(null);

  React.useEffect(() => {
    try {
      const locationSearch = decodeURI(window.location.search);
      const [query, params] = locationSearch.split("=");

      if (!params) return;
      if (query !== "?filter") return;
      const filters = params.split(",").map(filter => {
        return {
          value: filter.toLowerCase(),
          label: filter.slice(0, 1).toUpperCase() + filter.slice(1).toLowerCase()
        };
      });

      setSelectedCategories(filters);
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  const businessesByCategories = groupBusinessesByCategories(projectNodes);
  const businessCategories = Object.keys(businessesByCategories);
  const selectValues = businessCategories.map(category => ({
    value: category.toLowerCase(),
    label: category
  }));

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1>Bienvenidos a {site.title}</h1>

        <Select
          isClearable
          value={selectedCategories}
          closeMenuOnSelect={true}
          components={animatedComponents}
          options={selectValues}
          onChange={selected => {
            setSelectedCategories(selected);
          }}
        />

        {businessesByCategories &&
          renderBusinesessByCategory(businessesByCategories, selectedCategories)}
      </Container>
    </Layout>
  );

  function renderBusinesessByCategory(businessesByCategories, filter) {
    return Object.keys(businessesByCategories)
      .filter(category => {
        if (filter) {
          const hasCategory = filter.label === category;
          return hasCategory;
        } else return true;
      })
      .map(category => (
        <ProjectPreviewGrid
          key={category}
          title={category}
          nodes={businessesByCategories[category]}
          browseMoreHref="/archive/"
        />
      ));
  }
};

export default IndexPage;
