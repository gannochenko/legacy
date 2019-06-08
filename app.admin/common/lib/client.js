import React from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import Axios from 'axios';

export const Context = React.createContext();
export const withClient = Component => {
    const ComponentWithClient = props => (
        <Context.Consumer>
            {value => <Component {...props} client={value} />}
        </Context.Consumer>
    );

    return ComponentWithClient;
};

export class Client {
    constructor(settings) {
        this.settings = settings;
    }

    async query(parameters) {
        const apollo = await this.getApollo();
        return apollo.query({ ...parameters, fetchPolicy: 'network-only' });
    }

    async mutate(...args) {
        const apollo = await this.getApollo();
        return apollo.mutate(...args);
    }

    async get(path) {
        const url = await this.getUrl();
        return Axios.get(`${url}/${path}`);
    }

    /**
     * @private
     * @returns {ApolloClient}
     */
    async getApollo() {
        if (!this.apollo) {
            this.apollo = new ApolloClient({
                uri: `${await this.getUrl()}/graphql`,
                cache: new InMemoryCache(),
            });
        }

        return this.apollo;
    }

    async getUrl() {
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
