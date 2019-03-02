import { ApolloServer } from 'apollo-server-express';

import resolvers from '../graphql/resolvers/index';
import typeDefs from '../graphql/types/index';

export default (app, params = {}) => {
    // const { database, context } = params;
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        // context: async ({ req, res }) => {
        // },
        dataSources: () => {
            return {
            };
        },
        debug: true,
    });

    server.applyMiddleware({ app });
};
