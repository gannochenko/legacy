import { ApolloServer } from 'apollo-server-express';
import { renderPlaygroundPage } from '@apollographql/graphql-playground-html';
import { graphqlExpress } from './graphql-express';
import accepts from 'accepts';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import GQLGenerator from './gql-generator';
import ResolverGenerator from './resolver-generator';
import SchemaGenerator from './schema-generator';

import typeDefs from '../graphql/types/index';
import resolvers from '../graphql/resolvers/index';

let server = null;

const getServer = async ({
    cache,
    entityConfigurationProvider,
    connectionManager,
}) => {
    if (!server || !(await cache.get('apollo.server.ready'))) {
        if (server) {
            await server.stop();
        }

        // get entity configuration from the database
        const entities = await entityConfigurationProvider.get();
        // turn JSON-s into a real database entities
        const dbEntities = await SchemaGenerator.make({ entities });
        // put those entities into a connection
        const connection = await connectionManager.get({
            entities: Object.values(dbEntities),
            preConnect: true,
        });
        // create GRAPHQL types
        const eGQL = GQLGenerator.make({ entities });
        // create GRAPHQL resolvers
        const eResolver = ResolverGenerator.make({
            entities,
            dbEntities,
            connection,
        });

        // now everything is ready to create the server
        server = new ApolloServer({
            typeDefs: mergeTypes([...eGQL, ...typeDefs], { all: true }),
            resolvers: mergeResolvers([...eResolver, ...resolvers]),
            // context: async ({ req, res }) => {
            // },
            // dataSources: () => {
            //     return {};
            // },
            debug: __DEV__,
        });
        console.dir('Server created');

        await cache.set('apollo.server.ready', true, ['apollo']);
    }

    return server;
};

export default (app, params = {}) => {
    // server.applyMiddleware({ app, cors: false });
    const { cache } = params;

    app.use('/graphql', async (req, res, next) => {
        if (__DEV__ && req.method === 'GET') {
            const accept = accepts(req);
            const types = accept.types();
            const prefersHTML =
                types.find(
                    x => x === 'text/html' || x === 'application/json',
                ) === 'text/html';

            if (prefersHTML) {
                res.setHeader('Content-Type', 'text/html');
                const playground = renderPlaygroundPage({
                    endpoint: '/graphql',
                });
                res.write(playground);
                res.end();
                return;
            }
        }

        const serverInstance = await getServer(params);
        return graphqlExpress(() => {
            return serverInstance.createGraphQLServerOptions(req, res);
        })(req, res, next);
    });
};
