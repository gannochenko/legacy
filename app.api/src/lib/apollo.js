import { ApolloServer } from 'apollo-server-express';
import { renderPlaygroundPage } from '@apollographql/graphql-playground-html';
import { graphqlExpress } from './graphql-express';
import accepts from 'accepts';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import uuid from 'uuid/v4';

import SchemaStore from '../lib/schema-store';
import GQLGenerator from './gql-generator';
import ResolverGenerator from './resolver-generator';
import EntityManager from './entity-manager';
import DatabaseEntityManager from './database/entity-manager';
import DataLoaderPool from './data-loader-pool';

import typeDefs from '../graphql/types/index';
import resolvers from '../graphql/resolvers/index';

let server = null;

const getServer = async ({ cache, schemaProvider, connectionManager }) => {
    if (!server || !(await cache.get('apollo.server.ready'))) {
        if (server) {
            await server.stop();
            await connectionManager.close();
        }

        const schema = await SchemaStore.load('actual', connectionManager);
        const databaseEntityManager = new DatabaseEntityManager(schema);
        console.dir(await databaseEntityManager.get());

        const entityManager = new EntityManager(schemaProvider);
        const connection = await connectionManager.get({
            entities: Object.values(await entityManager.get()),
            preConnect: true,
        });

        // create GRAPHQL types
        const eGQL = await GQLGenerator.make({ schemaProvider });
        // create GRAPHQL resolvers
        const eResolver = await ResolverGenerator.make({
            schemaProvider,
            entityManager,
            connection,
        });

        // now everything is ready to create the server
        server = new ApolloServer({
            typeDefs: mergeTypes([...eGQL, ...typeDefs], { all: true }),
            resolvers: mergeResolvers([...eResolver, ...resolvers]),
            context: async ({ req, res }) => {
                return {
                    requestId: uuid(),
                    dataLoaderPool: new DataLoaderPool(),
                };
            },
            debug: __DEV__,
        });

        await cache.set('apollo.server.ready', true, ['apollo']);
    }

    return server;
};

export default (app, params = {}) => {
    // server.applyMiddleware({ app, cors: false });

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

                return res.send(playground);
            }
        }

        const serverInstance = await getServer(params);
        return graphqlExpress(() => {
            return serverInstance.createGraphQLServerOptions(req, res);
        })(req, res, next);
    });
};
