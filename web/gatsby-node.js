const { isFuture } = require("date-fns");
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createCategoryPage(graphql, actions) {
  const { createPage } = actions;
  const categoriesQuery = await graphql(`
    {
      allSanityCategory {
        edges {
          node {
            title
          }
        }
      }
    }
  `);

  if (categoriesQuery.errors) throw result.errors;

  for (let edge of categoriesQuery.data.allSanityCategory.edges) {
    const category = edge.node.title;
    const path = `/category/${category}/`;

    createPage({
      path,
      component: require.resolve("./src/templates/category.js"),
      context: { category }
    });
  }
}

async function createProjectPages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityBusiness(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const projectEdges = (result.data.allSanityBusiness || {}).edges || [];

  projectEdges.forEach(edge => {
    const id = edge.node.id;
    const slug = edge.node.slug.current;
    const path = `/business/${slug}/`;

    createPage({
      path,
      component: require.resolve("./src/templates/business.js"),
      context: { id }
    });
  });
}

exports.createPages = async ({ graphql, actions }) => {
  await createProjectPages(graphql, actions);
  await createCategoryPage(graphql, actions);
};
