import { Express, Response, Request } from 'express';
import { wrapError } from 'ew-internals';
import { getVaultFor, hasVaultFor, getVault } from './vault';

import { RuntimeParameters, Error, StringMap } from './type';

export class Result {
    public data?: any = null;
    public errors: Error[] = [];
    public status?: number = null;

    public toJSON(): object {
        return {
            data: this.data,
            errors: this.errors,
        };
    }
}

export const ERROR_INTERNAL = 'internal';
export const ERROR_REQUEST = 'request';

export const useMSC = (
    app: Express,
    controllers: Function[],
    runtimeParameters: RuntimeParameters = { connectionManager: null },
) => {
    console.log(require('util').inspect(getVault(), { depth: 10 }));

    controllers.forEach((controller: Function) => {
        if (!hasVaultFor(controller)) {
            return;
        }

        const { endpoint: rootEndpoint, methods } = getVaultFor(controller);
        if (_.isne(rootEndpoint) && _.ione(methods)) {
            Object.keys(methods).forEach((methodName: string) => {
                const methodRecord: StringMap = methods[methodName];

                const { method, fn, endpoint = '' } = methodRecord;
                if (!_.isne(method) && !_.isFunction(fn)) {
                    return;
                }

                app[method](
                    `${rootEndpoint}/${endpoint}`,
                    wrapError(async (req: Request, res: Response) => {
                        const result = await fn(req.params || {}, {
                            req,
                            res,
                            body: req.body,
                            headers: req.headers,
                            runtime: runtimeParameters,
                        });

                        let status = 200;
                        if (result instanceof Result) {
                            if (result.status) {
                                // eslint-disable-next-line prefer-destructuring
                                status = result.status;
                            } else if (
                                result.errors.find(
                                    error => error.type === ERROR_INTERNAL,
                                )
                            ) {
                                status = 500;
                            } else if (
                                result.errors.find(
                                    error => error.type === ERROR_REQUEST,
                                )
                            ) {
                                status = 400;
                            }
                        }
                        res.status(status);

                        const headers = res.getHeaders();
                        if (!('Content-Type' in headers)) {
                            res.header('Content-Type', 'application/json');
                        }

                        return res.send(JSON.stringify(result));
                    }),
                );
            });

            // const propsNames = Object.getOwnPropertyNames(controller.prototype);
            //
            // propsNames.forEach((propertyName: string) => {
            //
            //     const property = controller.prototype[propertyName];
            //     if (!_.isFunction(property) || !property.mscData) {
            //         return;
            //     }
            //
            //     const { method, endpoint = '' } = property.mscData;
            //     if (!_.isne(method)) {
            //         return;
            //     }
            //
            //     app[method](
            //         `${rootEndpoint}/${endpoint}`,
            //         wrapError(async (req: Request, res: Response) => {
            //             const result = await property(req.params || {}, {
            //                 req,
            //                 res,
            //                 body: req.body,
            //                 headers: req.headers,
            //                 runtime: runtimeParameters,
            //             });
            //
            //             let status = 200;
            //             if (result instanceof Result) {
            //                 if (result.status) {
            //                     // eslint-disable-next-line prefer-destructuring
            //                     status = result.status;
            //                 } else if (
            //                     result.errors.find(
            //                         error => error.type === ERROR_INTERNAL,
            //                     )
            //                 ) {
            //                     status = 500;
            //                 } else if (
            //                     result.errors.find(
            //                         error => error.type === ERROR_REQUEST,
            //                     )
            //                 ) {
            //                     status = 400;
            //                 }
            //             }
            //             res.status(status);
            //
            //             const headers = res.getHeaders();
            //             if (!('Content-Type' in headers)) {
            //                 res.header('Content-Type', 'application/json');
            //             }
            //
            //             return res.send(JSON.stringify(result));
            //         }),
            //     );
            // });
        }
    });
};
