import { ReactNode } from 'react';
import { Schema, Entity, EntityItemData } from '@project-minimum/core';
import { PageProperties, PageState } from '../../store/type';
import { Route } from '../../lib/type';
import { Client } from '../../lib/client';

export interface DataPageProperties extends PageProperties {
    schema: Schema;
    data: EntityItemData[];
    count: number;
    dispatchDelete: (
        client: Client,
        entity: Entity,
        code: string,
        pageParams: object,
    ) => void;
    dispatchUpdateSearch: (route: Route, parameters: object) => void;
    openConfirmModal: (
        text: ReactNode,
        renderButtons: (params: { closeModal: () => void }) => ReactNode[],
    ) => void;
}

export interface State extends PageState {
    data: EntityItemData[];
    count: number;
}

export interface DispatchLoadProperties {
    entity: Entity;
    pageParams: object;
}
