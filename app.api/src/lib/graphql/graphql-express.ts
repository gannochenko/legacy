import { runHttpQuery, convertNodeHttpToRequest } from 'apollo-server-core';
import { NextFunction, Request, Response } from 'express';

export function graphqlExpress(options: () => any) {
    if (!options) {
        throw new Error('Apollo Server requires options.');
    }

    if (arguments.length > 1) {
        // TODO: test this
        throw new Error(
            `Apollo Server expects exactly one argument, got ${
                arguments.length
            }`,
        );
    }

    return (req: Request, res: Response, next: NextFunction) => {
        runHttpQuery([req, res], {
            method: req.method,
            options,
            query: req.method === 'POST' ? req.body : req.query,
            request: convertNodeHttpToRequest(req),
        }).then(
            ({ graphqlResponse, responseInit }) => {
                if (responseInit.headers) {
                    // eslint-disable-next-line no-restricted-syntax
                    for (const [name, value] of Object.entries(
                        responseInit.headers,
                    )) {
                        res.setHeader(name, value);
                    }
                }
                res.write(graphqlResponse);
                res.end();
            },
            // eslint-disable-next-line consistent-return
            error => {
                if (error.name !== 'HttpQueryError') {
                    return next(error);
                }

                if (error.headers) {
                    // eslint-disable-next-line no-restricted-syntax
                    for (const [name, value] of Object.entries(error.headers)) {
                        res.setHeader(name, value as string);
                    }
                }

                res.statusCode = error.statusCode;
                res.write(error.message);
                res.end();
            },
        );
    };
}
