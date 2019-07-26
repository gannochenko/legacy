import { Request, Response } from 'express';
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
