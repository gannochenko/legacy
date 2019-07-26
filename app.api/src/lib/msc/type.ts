import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import ConnectionManager from '../database/connection-manager';

export type PropertyDescriptor = TypedPropertyDescriptor<
    (params: any) => Promise<any>
> & { initializer?: Function } & { value?: Function };

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

export interface StringMap {
    [key: string]: any;
}
