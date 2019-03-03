import { ApolloServer } from 'apollo-server-express';
import {
    renderPlaygroundPage,
} from '@apollographql/graphql-playground-html'
import { graphqlExpress } from './graphql-express';
import accepts from 'accepts';

import resolvers from '../graphql/resolvers/index';
import typeDefs from '../graphql/types/index';

let server = null;

const getServer = () => {
    if (!server) {
        server = new ApolloServer({
            typeDefs,
            resolvers,
            // context: async ({ req, res }) => {
            // },
            dataSources: () => {
                return {
                };
            },
            debug: __DEV__,
        });
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
                res.write(playground);
                res.end();
                return;
            }
        }
        return graphqlExpress(() => {
            return getServer().createGraphQLServerOptions(req, res);
        })(req, res, next);
    });
};
