import Client from 'ew-internals-ui';

export interface HomePageProperties {
    client: Client;
    error: object[];
    notify: (message: object) => void;
    dispatchLoad: (client: Client) => void;
}
