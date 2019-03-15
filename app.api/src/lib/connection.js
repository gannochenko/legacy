import { injectPassword } from './util';
import { createConnection } from 'typeorm';

// todo: simplify this file, this is too much
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

    constructor(props = {}) {
        const { url, password, entities } = props;
        const sUrl = injectPassword(url, password);
        if (!_.isne(sUrl)) {
            throw new Error('No setting provided to connect to the database');
        }

        this._url = sUrl;
        this._entities = entities;
    }

    async getRaw() {
        if (!this._connection) {
            console.dir('eee');
            console.log(require('util').inspect(this._entities, { depth: 10 }));

            this._connection = await createConnection({
                type: 'postgres',
                url: this._url,
                entities: this._entities || [],
            });
        }

        return this._connection;
    }
}
