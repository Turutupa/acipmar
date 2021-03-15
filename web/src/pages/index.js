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
import FuzzyPicker from "react-fuzzy-picker";
import "../styles/fuzzy-picker.css";
import styles from "../styles/inputs-wrapper.module.css";

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
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  React.useEffect(() => {
    try {
      const locationSearch = decodeURI(window.location.search);
      const [urlQuery, params] = locationSearch.split("=");

      if (!params) return;
      if (urlQuery !== "?filter") return;

      setSelectedCategory({
        value: params,
        label: params[0].toUpperCase() + params.slice(1).toLowerCase()
      });
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
  // values for the fuzzy picker
  const fuzzyValues = businesses.map(business => business.title);

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
    <Layout clearFilters={() => setSelectedCategory(null)}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        {selectedCategory ? <h1>{selectedCategory.label}</h1> : <h1>Bienvenidos a {site.title}</h1>}

        <div className={styles.inputsWrapper}>
          <div
            style={{
              width: "100%",
              marginRight: "10px",
              marginBottom: "20px",
              position: "relative"
            }}
          >
            <label>Categorías</label>
            <Select
              isClearable
              value={selectedCategory}
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={selectValues}
              placeholder="Seleccionar categoría"
              onChange={selected => {
                setSelectedCategory(selected);
              }}
            />
          </div>

          <div style={{ width: "100%", position: "relative" }}>
            <label>Buscar por nombre</label>

            <FuzzyPicker
              label="Buscar por nombre"
              isOpen={true}
              autoCloseOnEnter
              onChange={choice => {
                try {
                  businesses.forEach(business => {
                    if (business.title === choice) {
                      window.location = `/business/${business.slug.current}`;
                    }
                  });
                } catch (e) {
                  console.error(e);
                }
              }}
              items={fuzzyValues}
              placeholder="Buscar negocio"
            />
          </div>
        </div>

        {businessesByCategories &&
          renderBusinesessByCategory(businessesByCategories, selectedCategory)}
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
          currentCategory={selectedCategory}
          browseMoreHref={() =>
            setSelectedCategory({
              value: category,
              label: category[0].toUpperCase() + category.slice(1).toLowerCase()
            })
          }
        />
      ));
  }
};

export default IndexPage;
