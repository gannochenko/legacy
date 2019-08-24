export interface FindQuerySort<E = {}> {
    [key: string]: 'asc' | 'desc';
}

export interface ResultError {
    message?: string;
    code: string;
    type?: string;
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
