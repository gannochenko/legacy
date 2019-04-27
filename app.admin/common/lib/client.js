import React from 'react';
import ApolloClient from 'apollo-boost';
import Axios from 'axios';

export const Context = React.createContext();
export const withClient = Component => {
    return props => (
        <Context.Consumer>
            {value => <Component {...props} client={value} />}
        </Context.Consumer>
    );
};

export class Client {
    constructor(settings) {
        this._settings = settings;
    }

    async query(...args) {
        const apollo = await this.getApollo();
        return apollo.query(...args);
    }

    async mutate(...args) {
        const apollo = await this.getApollo();
        return apollo.mutate(...args);
    }

    async get(path) {
        const url = await this.getUrl();
        return await Axios.get(`${url}/${path}`);
    }

    /**
     * @private
     * @returns {ApolloClient}
     */
    async getApollo() {
        if (!this._apollo) {
            this._apollo = new ApolloClient({
                uri: `${await this.getUrl()}/graphql`,
            });
        }

        return this._apollo;
    }

    async getUrl() {
        return this._settings.get('api.url');
    }
}

export const createClient = settings => {
    return new Client(settings);
};
