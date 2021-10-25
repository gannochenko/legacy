/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { normalizeHeritageObject } = require('./src/services/HeritageObject/normalize');

const { introspectionQuery, graphql, printSchema } = require('gatsby/graphql');
const write = require('write');
const axios = require('axios');
// const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const path = require('path');
const fillTemplate = require('./src/pathTemplates').fillTemplate;
const allowedEnvVariables = require('./.env.js').allowedEnvVariables;

const BLOG_DETAIL = require('./src/pathTemplates').BLOG_DETAIL;

/**
 * Generate GraphQL schema.json file to be read by tslint
 * Thanks: https://gist.github.com/kkemple/6169e8dc16369b7c01ad7408fc7917a9
 */
exports.onPostBootstrap = async ({ store }) => {
    try {
        const { schema } = store.getState();
        const jsonSchema = await graphql(schema, introspectionQuery);
        const sdlSchema = printSchema(schema);

        write.sync('schema.json', JSON.stringify(jsonSchema.data), {});
        write.sync('schema.graphql', sdlSchema, {});

        console.log('\n\n[gatsby-plugin-extract-schema] Wrote schema\n'); // eslint-disable-line
    } catch (error) {
        console.error(
            '\n\n[gatsby-plugin-extract-schema] Failed to write schema: ',
            error,
            '\n',
        );
    }
};

const contentPageLayouts = {
    'blog': './src/components/default/BlogDetail/BlogDetail.tsx',
};

const contentTypeToPath = {
    'blog': BLOG_DETAIL,
};

exports.sourceNodes = async ({ actions }) => {
    const result = await axios.request({
        url: `${process.env.API_URL}/dev/data/objects/findall`,
        method: 'post',
        headers: {'x-api-key': process.env.CICD_API_KEY},
    });

    result.data.data.forEach(object => {
        actions.createNode(normalizeHeritageObject({
            ...object,
            internal: {
                type: "HeritageObject",
                contentDigest: (object.version ?? '1').toString(),
            },
        }));
    });
}

const createObjectsPages = async ({ graphql }) => {
    const result = await graphql(`
        query MyHeritageObjectQuery {
          allHeritageObject {
            nodes {
              name
              kind
              id
            }
          }
        }
    `);

    // console.log(require('util').inspect(result, { depth: 10 }));
};

const createMDXPages = async ({ graphql, actions }) => {
    const result = await graphql(`
        query CreatePagesQuery {
            allMdx {
                edges {
                    node {
                        id
                        fileAbsolutePath
                        frontmatter {
                            published
                            slug
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        console.error(result.errors);
        throw new Error(result.errors);
    }

    if (!result.data || !result.data.allMdx) {
        return;
    }

    const edges = result.data.allMdx.edges;
    if (!edges) {
        return;
    }

    edges.forEach(({ node }) => {
        const {
            fileAbsolutePath,
            frontmatter: { slug, published } = {},
        } = node;

        const match = fileAbsolutePath.match(
            /\/content\/([^\/]+)\/([^\/]+)\//,
        );
        if (!match) {
            console.warn(
                'Was not able to parse file path structure. Skipping.',
            );
            return;
        }

        const [, contentType, fileSlug] = match;
        const realSlug = slug || fileSlug;

        if (!realSlug) {
            console.warn('Entry without slug detected. Skipping.');
            return;
        }

        const component = contentPageLayouts[contentType];
        let realPath = contentTypeToPath[contentType].replace(
            '#SLUG#',
            realSlug,
        );
        if (!published) {
            realPath = `/drafts${realPath}`;
        }

        if (!component) {
            console.error(
                `There is an entry, but I cant create a page for it. Skipping.`,
            );
            return;
        }

        actions.createPage({
            // Encode the route
            path: realPath,
            // Layout for the page
            component: path.resolve(component),
            // Values defined here are injected into the page as props and can
            // be passed to a GraphQL query as arguments
            context: {
                id: node.id,
            },
        });
    });
};

exports.createPages = async ({ graphql, actions }) => {
    await createObjectsPages({ graphql, actions });
    await createMDXPages({ graphql, actions });
};

const getEnv = () => {
    const result = [];

    allowedEnvVariables.forEach((variableName) => {
        if (
            variableName in process.env &&
            process.env[variableName] !== undefined
        ) {
            result[`process.env.${variableName}`] =
                '"' + process.env[variableName] + '"';
        }
    });

    return result;
};

exports.onCreateWebpackConfig = ({
    stage,
    // rules,
    // loaders,
    plugins,
    actions,
}) => {
    actions.setWebpackConfig({
        plugins: [
            plugins.define({
                __DEV__: stage === `develop` || stage === `develop-html`,
                ...getEnv(),
            }),
        ],
        resolve: {
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
            symlinks: false,
        },
    });
};
