import { Error, Route } from '../lib/type';
import { Client } from '../lib/client';

export interface ControllerProperties {
    ready: boolean;
    client: Client;
    theme: StringToAnyMap;
    error?: object;
    dispatch?: (action: object) => void;
    dispatchLoad?: (
        client: Nullable<Client>,
        parameters?: Nullable<object>,
    ) => void;
    dispatchUnload?: () => void;
    notify?: () => void; // todo: take from ew-internals-ui
}

export interface PageProperties extends ControllerProperties {
    route: Route;
}

export interface PageState {
    loading: boolean;
    ready: boolean;
    error: Nullable<Error>;
}

export interface Action {
    type: string;
    payload?: object;
}

export type Dispatch = (action: Action) => void;
