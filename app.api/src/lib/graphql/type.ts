import {
    DB_QUERY_FIND_MAX_PAGE_SIZE,
    // @ts-ignore
} from 'project-minimum-core';

import { Result } from '../result';

export interface Context {}

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
