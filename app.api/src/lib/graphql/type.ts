import { Result } from '@bucket-of-bolts/express-mvc';
import { DB_QUERY_FIND_MAX_PAGE_SIZE } from '@project-minimum/core';

import { ObjectLiteral } from 'typeorm';
import DataLoaderPool from '../database/data-loader-pool';
import { ResultError } from '../type';

export interface Context {
    dataLoaderPool: DataLoaderPool;
}

export class FindResult extends Result {
    public data?: any[] = [];
    public limit?: number = DB_QUERY_FIND_MAX_PAGE_SIZE;
    public offset: number = 0;
    public count?: number;
}

export class PutDeleteResult extends Result {
    // ENTITY_ID_FIELD_NAME
    public id: Nullable<string> = null;
}

export interface ASTNode {
    fieldNodes: ASTNode[];
    selectionSet: {
        selections: ASTNode[];
    };
    name: {
        value: string;
    };
}

export interface GetDeleteQueryArguments {
    id: string;
}

export interface PutQueryArguments {
    id?: string;
    data: StringMap;
}

export interface ItemResult {
    errors: ResultError[];
    item: ObjectLiteral;
}
