import { Item } from '../../lib/project-minimum-core';

export interface ListPropertyColumnItem {
    name: string;
    displayName: string;
    sortable: boolean;
    renderer?: Function;
}

export interface ListPropertyOrder {
    cell: string;
    way: 'asc' | 'desc';
}

export type ListPropertyItemActionGetHref = (item: Item) => string;
export type ListPropertyItemActionOnClick = (
    name: string,
    item: Item,
    closePanel: () => void,
) => void;

export interface ListPropertyItemAction {
    name: string;
    displayName: string;
    icon: string;
    getHref: Nullable<ListPropertyItemActionGetHref>;
    onClick: Nullable<ListPropertyItemActionOnClick>;
}

export interface ListProperties {
    columns: ListPropertyColumnItem[];
    data: Item[];
    itemActions?: ListPropertyItemAction[];
    page: number;
    count: Nullable<number>;
    pageSize: number;
    sort: ListPropertyOrder;
    onPageChange: (page: number) => void;
    onSortChange: (order: ListPropertyOrder) => void;
    keyProperty: string;
}
