import Client from 'ew-internals-ui';

export interface SchemaPageProperties {
    client: Client;
    error: object[];
    notify: (message: object) => void;
    dispatchLoad: (client: Client) => void;
}
