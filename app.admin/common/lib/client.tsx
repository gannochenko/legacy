import React from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import Axios from 'axios';
import { Settings } from 'ew-internals';

export const Context = React.createContext({});
export const withClient = Component => {
    const WithClient = props => (
        <Context.Consumer>
            {value => <Component {...props} client={value} />}
        </Context.Consumer>
    );

    const wrappedComponentName =
        Component.displayName || Component.name || 'Component';

    WithClient.displayName = `withClient(${wrappedComponentName})`;
    return WithClient;
};

export class Client {
    protected settings: Settings;

    protected apollo;

    public constructor(settings) {
        this.settings = settings;
    }

    public async query(parameters) {
        const apollo = await this.getApollo();
        return apollo.query({ ...parameters, fetchPolicy: 'network-only' });
    }

    public async mutate(...args) {
        const apollo = await this.getApollo();
        return apollo.mutate(...args);
    }

    public async get(path) {
        const url = await this.getUrl();
        return Axios.get(`${url}/${path}`);
    }

    /**
     * @private
     * @returns {ApolloClient}
     */
    public async getApollo() {
        if (!this.apollo) {
            this.apollo = new ApolloClient({
                uri: `${await this.getUrl()}/graphql`,
                cache: new InMemoryCache(),
            });
        }

        return this.apollo;
    }

    public async getUrl() {
        let url = await this.settings.get('api.url');
        if (__DEV__) {
            url = url.replace('localhost', document.location.hostname);
        }

        return url;
    }
}

export const createClient = settings => {
    return new Client(settings);
};
