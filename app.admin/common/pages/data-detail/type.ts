import { PageProperties } from '../../store/type';
import { Entity, EntityItemData, Schema } from 'project-minimum-core';
import { Client } from '../../lib/client';
import { Route } from '../../lib/type';

export interface DataDetailPayload {
    field: string;
    data?: object;
    error?: object;
}

export interface DataDetailAction {
    type: string;
    payload: DataDetailPayload;
}

interface DataDetailUpdateSearchPayload {}

interface DataDetailSavePayload {
    entity: Entity;
    values: any;
    formActions: any;
    id: string;
}

interface DataDetailDeletePayload {
    entity: Entity;
    id: string;
}

export interface DataDetailPageProperties extends PageProperties {
    schema: Schema;
    data: EntityItemData;
    count: number;
    dispatchNavigateToDetail: (entity: Entity, itemCode?: string) => void;
    dispatchDelete: (
        client: Client,
        parameters: DataDetailDeletePayload,
    ) => void;
    dispatchUpdateSearch: (
        route: Route,
        parameters: DataDetailUpdateSearchPayload,
    ) => void;
    formData: object;
    saveCounter: number;
    dispatchSuccess: () => void;
    dispatchSave: (client: Client, parameters: DataDetailSavePayload) => void;
}
