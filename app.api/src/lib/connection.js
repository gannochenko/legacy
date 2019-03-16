import { injectPassword } from './util';
import { createConnection } from 'typeorm';

// todo: simplify this file, this is too much, make it stateless
export default class Connection {
    static async make(params = {}) {
        const { settings, preConnect } = params;
        if (!settings) {
            throw new Error('No settings provided');
        }

        const url = await settings.get('db.url', null);
        const password = await settings.get('db.password', null);

        const self = new this({
            url,
            password,
            ...params,
        });

        if (preConnect) {
            await self.getRaw();
        }

        return self;
    }

    // todo: it makes no sense to use constructor, just return typeorm connection and that is it
    constructor(props = {}) {
        const { url, password, entities, name } = props;
        const sUrl = injectPassword(url, password);
        if (!_.isne(sUrl)) {
            throw new Error('No setting provided to connect to the database');
        }

        this._url = sUrl;
        this._entities = entities;
        this._name = name;
    }

    async getRaw() {
        if (!this._connection) {
            this._connection = await createConnection({
                name: this._name,
                type: 'postgres',
                url: this._url,
                entities: this._entities || [],
            });
        }

        return this._connection;
    }
}
