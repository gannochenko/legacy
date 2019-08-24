import {
    DB_QUERY_FIND_MAX_PAGE_SIZE,
    // @ts-ignore
} from 'project-minimum-core';

import DataLoaderPool from '../database/data-loader-pool';
import { Result } from '../result';

export interface Context {
    dataLoaderPool: DataLoaderPool;
}

export class FindResult extends Result {
    public limit: number = DB_QUERY_FIND_MAX_PAGE_SIZE;
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

export interface FindQuerySort<E = {}> {
    [key: string]: 'asc' | 'desc';
}

type SYSLogic = 'AND' | 'OR' | 'NAND' | 'NOR';
interface FilterItem {
    Operation: 'EQ' | 'NE' | 'IN' | 'NIN' | 'GT' | 'LT' | 'GTE' | 'LTE';
    Value?: string;
    Values?: string[];
}

export interface FindQueryFilter<E = {}> {
    [key: string]: FilterItem | SYSLogic | FindQueryFilter<E>[];
}

export interface FindQueryArguments<E = {}> {
    filter?: FindQueryFilter;
    search?: string;
    select?: string[];
    sort?: FindQuerySort<E>;
    limit?: Nullable<number | string>;
    offset?: Nullable<number | string>;
    page?: Nullable<number | string>;
    pageSize?: Nullable<number | string>;
}

export interface PutQueryArguments {
    id?: string;
    data: StringMap;
}

export interface Item {
    id: string;
    idInternal: number;
}
