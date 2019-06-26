import { PageProperties, PageState } from '../../store/type';
import { Schema, Entity, EntityItemData } from '../../lib/project-minimum-core';
import { Route } from '../../lib/type';
import { Client } from '../../lib/client';

export interface DataPageProperties extends PageProperties {
    schema: Schema;
    data: EntityItemData[];
    count: number;
    dispatchNavigateToDetail: (entity: Entity, itemCode?: string) => void;
    dispatchDelete: (
        client: Client,
        entity: Entity,
        code: string,
        pageParams: object,
    ) => void;
    dispatchUpdateSearch: (route: Route, parameters: object) => void;
}

export interface State extends PageState {
    data: EntityItemData[];
    count: number;
}

export interface DispatchLoadProperties {
    entity: Entity;
    pageParams: object;
}
