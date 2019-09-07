import { ApolloServer } from 'apollo-server-express';
import { renderPlaygroundPage } from '@apollographql/graphql-playground-html';
import accepts from 'accepts';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { Express, NextFunction, Request, Response } from 'express';
// @ts-ignore
import uuid from 'uuid/v4';
import { Settings } from '@bucket-of-bolts/util';
import { graphqlExpress } from './graphql-express';
import SchemaService from '../../service/schema';
import GQLTypeGenerator from './type-generator';
import ResolverGenerator from './resolver-generator';
import DatabaseEntityManager from '../database/entity-manager';

import DataLoaderPool from '../database/data-loader-pool';
import typeDefs from '../../graphql/types';
import resolvers from '../../graphql/resolvers';
import Cache from '../cache';
import ConnectionManager from '../database/connection-manager';

interface ServerParams {
    cache: Cache;
    connectionManager: ConnectionManager;
    settings: Settings;
}

let server: Nullable<ApolloServer> = null;

const getServer = async ({ cache, connectionManager }: ServerParams) => {
    if (!server || !(await cache.get('apollo.server.ready'))) {
        if (server) {
            await server.stop();
            await connectionManager.close();
        }

        const schema = await SchemaService.load('actual', connectionManager);
        const databaseEntityManager = new DatabaseEntityManager(schema);

        const connection = await connectionManager.get({
            entities: Object.values(await databaseEntityManager.get()),
            preConnect: true,
        });

        const entityTypeDefs = GQLTypeGenerator.make(schema);
        const eResolver = ResolverGenerator.make(
            schema,
            databaseEntityManager,
            connection,
        );

        // now everything is ready to create the server
        server = new ApolloServer({
            typeDefs: mergeTypes([...entityTypeDefs, ...typeDefs], {
                all: true,
            }),
            resolvers: mergeResolvers([...eResolver, ...resolvers]),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const useGraphQL = (app: Express, runtimeParameters: ServerParams) => {
    // server.applyMiddleware({ app, cors: false });

    app.use(
        '/graphql',
        async (req: Request, res: Response, next: NextFunction) => {
            if (__DEV__ && req.method === 'GET') {
                const accept = accepts(req);
                const types = accept.types() as string[];
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

            const serverInstance = await getServer(runtimeParameters);
            return graphqlExpress(() => {
                return serverInstance.createGraphQLServerOptions(req, res);
            })(req, res, next);
        },
    );
};

export default useGraphQL;
