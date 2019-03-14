import { ApolloServer } from 'apollo-server-express';
import { renderPlaygroundPage } from '@apollographql/graphql-playground-html';
import { graphqlExpress } from './graphql-express';
import accepts from 'accepts';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import GQLGenerator from './gql-generator';
import ResolverGenerator from './resolver-generator';

import typeDefs from '../graphql/types/index';
import resolvers from '../graphql/resolvers/index';

let server = null;

const getServer = async ({ cache, entityProvider }) => {
    if (!server || !(await cache.get('apollo.server.ready'))) {
        if (server) {
            await server.stop();
        }

        const entites = await entityProvider.get();
        const eGQL = entites.map(entity => GQLGenerator.make(entity));
        const eResolver = entites.map(entity => ResolverGenerator.make(entity));

        server = new ApolloServer({
            typeDefs: mergeTypes([...eGQL, ...typeDefs], { all: true }),
            resolvers: mergeResolvers([...eResolver, ...resolvers]),
            // context: async ({ req, res }) => {
            // },
            dataSources: () => {
                return {};
            },
            debug: __DEV__,
        });

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
