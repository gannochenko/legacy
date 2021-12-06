/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const {
    normalizeHeritageObject,
} = require('./src/services/HeritageObject/normalize');
const { makePublicPath } = require('./src/util/makePublicPath');
const { introspectionQuery, graphql, printSchema } = require('gatsby/graphql');
const { createRemoteFileNode } = require('gatsby-source-filesystem');
const write = require('write');
const axios = require('axios');
// const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const path = require('path');
const allowedEnvVariables = require('./.env.js').allowedEnvVariables;

const {
    fillTemplate,
    HERITAGE_LIST,
    HERITAGE_DETAIL,
} = require('./src/pathTemplates');

console.log('VERCEL!!!!!!!!');
console.log(process.env.VERCEL_GIT_COMMIT_REF);

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

exports.sourceNodes = async ({ actions }) => {
    const result = await axios.request({
        url: `${process.env.API_URL}/${process.env.API_ENV}/data/objects/findall`,
        method: 'post',
        headers: { 'x-api-key': process.env.CICD_API_KEY },
    });

    const data = result.data.data;

    for (let item of data) {
        actions.createNode({
            ...normalizeHeritageObject(item),
            internal: {
                type: 'HeritageObject',
                contentDigest: (item.version ?? '1').toString(),
            },
        });
    }
};

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    createTypes(`
        type HeritageObject implements Node {
            previewPhotoImage: File @link(from: "fields.previewPhoto")
            headerPhotoImage: File @link(from: "fields.headerPhoto")
            photoImages: [File] @link(from: "fields.photos")
        }
    `);
};

exports.onCreateNode = async ({
    node,
    actions: { createNode, createNodeField },
    store,
    cache,
    createNodeId,
}) => {
    const { internal } = node;

    if (internal.type === 'HeritageObject') {
        const { photos } = node;

        const fileNodes = [];
        let previewPhoto = null;
        let headerPhoto = null;
        if (photos) {
            for (const photo of photos) {
                const { variants, header, preview } = photo;
                const photoURL = makePublicPath(variants.normalized);
                const fileNode = await createRemoteFileNode({
                    url: photoURL, // string that points to the URL of the image
                    parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
                    createNode, // helper function in gatsby-node to generate the node
                    createNodeId, // helper function in gatsby-node to generate the node id
                    cache, // Gatsby's cache
                    store, // Gatsby's Redux store
                });

                if (fileNode) {
                    fileNodes.push(fileNode);
                }

                if (header) {
                    headerPhoto = fileNode.id;
                }
                if (preview) {
                    previewPhoto = fileNode.id;
                }
            }
        }
        createNodeField({
            node,
            name: 'photos',
            value: fileNodes.map((fileNode) => fileNode.id),
        });
        createNodeField({
            node,
            name: 'headerPhoto',
            value: headerPhoto,
        });
        createNodeField({
            node,
            name: 'previewPhoto',
            value: previewPhoto,
        });
    }
};

const createHeritageObjectPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    const result = await graphql(`
        query MyHeritageObjectQuery {
            allHeritageObject {
                nodes {
                    id
                    slug
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    const objects = result.data.allHeritageObject.nodes;

    // list page with pagination
    const postsPerPage = 20;
    const numPages = Math.ceil(objects.length / postsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
            path: i === 0 ? HERITAGE_LIST : `${HERITAGE_LIST}/${i + 1}`,
            component: path.resolve(
                './src/templates/HeritageObjectList/HeritageObjectList.tsx',
            ),
            context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage: i + 1,
            },
        });
    });

    // detail page
    objects.forEach(({ id, slug }) => {
        actions.createPage({
            path: fillTemplate(HERITAGE_DETAIL, { SLUG: slug }),
            component: path.resolve(
                './src/templates/HeritageObjectDetailTemplate/HeritageObjectDetailTemplate.tsx',
            ),
            context: {
                id,
            },
        });
    });
};

// const createMDXPages = async ({ graphql, actions }) => {
//     const result = await graphql(`
//         query CreatePagesQuery {
//             allMdx {
//                 edges {
//                     node {
//                         id
//                         fileAbsolutePath
//                         frontmatter {
//                             published
//                             slug
//                         }
//                     }
//                 }
//             }
//         }
//     `);
//
//     if (result.errors) {
//         console.error(result.errors);
//         throw new Error(result.errors);
//     }
//
//     if (!result.data || !result.data.allMdx) {
//         return;
//     }
//
//     const edges = result.data.allMdx.edges;
//     if (!edges) {
//         return;
//     }
//
//     edges.forEach(({ node }) => {
//         const {
//             fileAbsolutePath,
//             frontmatter: { slug, published } = {},
//         } = node;
//
//         const match = fileAbsolutePath.match(
//             /\/content\/([^\/]+)\/([^\/]+)\//,
//         );
//         if (!match) {
//             console.warn(
//                 'Was not able to parse file path structure. Skipping.',
//             );
//             return;
//         }
//
//         const [, contentType, fileSlug] = match;
//         const realSlug = slug || fileSlug;
//
//         if (!realSlug) {
//             console.warn('Entry without slug detected. Skipping.');
//             return;
//         }
//
//         const component = contentPageLayouts[contentType];
//         let realPath = contentTypeToPath[contentType].replace(
//             '#SLUG#',
//             realSlug,
//         );
//         if (!published) {
//             realPath = `/drafts${realPath}`;
//         }
//
//         if (!component) {
//             console.error(
//                 `There is an entry, but I cant create a page for it. Skipping.`,
//             );
//             return;
//         }
//
//         actions.createPage({
//             // Encode the route
//             path: realPath,
//             // Layout for the page
//             component: path.resolve(component),
//             // Values defined here are injected into the page as props and can
//             // be passed to a GraphQL query as arguments
//             context: {
//                 id: node.id,
//             },
//         });
//     });
// };

exports.createPages = async ({ graphql, actions }) => {
    await createHeritageObjectPages({ graphql, actions });
    // await createMDXPages({ graphql, actions });
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
