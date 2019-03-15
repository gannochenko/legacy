import { injectPassword } from './util';
import { createConnection } from 'typeorm';

export default class Connection {
    static async make(params = {}) {
        const { settings, entityProvider } = params;
        if (!settings) {
            throw new Error('No settings provided');
        }

        const url = await settings.get('db.url', null);
        const password = await settings.get('db.password', null);

        if (entityProvider) {
        }

        return new this({
            url,
            password,
        });
    }

    constructor(props = {}) {
        const { url, password } = props;
        const sUrl = injectPassword(url, password);
        if (!_.isne(sUrl)) {
            throw new Error('No setting provided to connect to the database');
        }

        this._url = sUrl;
    }

    async getRaw() {
        if (!this._connection) {
            this._connection = await createConnection({
                type: 'postgres',
                url: this._url,
            });
        }

        return this._connection;
    }
}
