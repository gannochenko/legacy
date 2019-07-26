/**
 * Model - Service - Controller :)
 */

import { Express, Response, Request } from 'express';
import { wrapError } from 'ew-internals';
import { IncomingHttpHeaders } from 'http';
import ConnectionManager from '../database/connection-manager';

export interface MSCData {
    [key: string]: any;
}
export type PatchedConstructor = Function & { mscData?: MSCData };
export type PatchedPropertyDescriptor = TypedPropertyDescriptor<
    (params: any) => Promise<any>
> & { value?: Function & { mscData?: MSCData } };

export interface RuntimeParameters {
    connectionManager?: ConnectionManager;
}
export interface InputContext {
    req: Request;
    res: Response;
    body: any;
    headers: IncomingHttpHeaders;
    runtime: RuntimeParameters;
}

export interface Error {
    message?: string;
    code: string;
    type?: string;
}
export interface Result {
    data?: any;
    errors: Error[];
    status?: number;
}

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

export const Endpoint = (endpoint: string): PatchedConstructor => {
    return (constructor: PatchedConstructor) => {
        constructor.mscData = constructor.mscData || { endpoint: '' };
        constructor.mscData.endpoint = endpoint;

        return constructor;
    };
};

export const Get = (endpoint?: string): Function => {
    return (
        target,
        property: string,
        descriptor: PatchedPropertyDescriptor,
    ): PatchedPropertyDescriptor => {
        const { value } = descriptor;
        value.mscData = Object.assign({}, value.mscData, {
            endpoint,
            method: 'get',
        });

        return descriptor;
    };
};

export const Put = (endpoint?: string): Function => {
    return (
        target,
        property: string,
        descriptor: PatchedPropertyDescriptor,
    ): PatchedPropertyDescriptor => {
        const { value } = descriptor;
        value.mscData = Object.assign({}, value.mscData, {
            endpoint,
            method: 'put',
        });

        return descriptor;
    };
};

export const Patch = (endpoint?: string): Function => {
    return (
        target,
        property: string,
        descriptor: PatchedPropertyDescriptor,
    ): PatchedPropertyDescriptor => {
        const { value } = descriptor;
        value.mscData = Object.assign({}, value.mscData, {
            endpoint,
            method: 'patch',
        });

        return descriptor;
    };
};

export const useMSC = (
    app: Express,
    controllers: PatchedConstructor[],
    runtimeParameters: RuntimeParameters = { connectionManager: null },
) => {
    controllers.forEach((controller: PatchedConstructor) => {
        const data = controller.mscData || {};
        const { endpoint: rootEndpoint } = data;

        if (_.isne(rootEndpoint)) {
            const propsNames = Object.getOwnPropertyNames(controller.prototype);

            propsNames.forEach((propertyName: string) => {
                const property = controller.prototype[propertyName];
                if (!_.isFunction(property) || !property.mscData) {
                    return;
                }

                const { method, endpoint = '' } = property.mscData;
                if (!_.isne(method)) {
                    return;
                }

                app[method](
                    `${rootEndpoint}/${endpoint}`,
                    wrapError(async (req: Request, res: Response) => {
                        const result = await property(req.params || {}, {
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
        }
    });
};
