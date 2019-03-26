import { createConnection } from 'typeorm';

import SchemaEntity from '../entity/schema';
import migrations from '../migrations';
import { DB_MIGRATION_TABLE_NAME } from '../constants';
import {injectPassword} from "./util";

export default class ConnectionManager {
    constructor({ settings }) {
        this._settings = settings;
        this._connections = {};
    }

    async get({ entities, preConnect }) {
        if (!this._connections.entity) {
            this._connections.entity = this.make({
                settings: this._settings,
                entities,
                preConnect,
            });
        }
        return this._connections.entity;
    }

    async close() {
        if (this._connections.entity) {
            await this._connections.entity.close();
            this._connections.entity = null;
        }
    }

    async getSystem() {
        if (!this._connections.simple) {
            this._connections.simple = this.make({
                name: 'system',
                settings: this._settings,
                entities: [
                    SchemaEntity,
                    // todo: user entity, group entity
                ],
                migrationsTableName: DB_MIGRATION_TABLE_NAME,
                migrations,
            });
        }
        return this._connections.simple;
    }

    async invalidateConnections() {
        await this.close();
        this._connections = {};
    }

    async make(params = {}) {
        const { settings } = params;
        if (!settings) {
            throw new Error('No settings provided');
        }

        const url = await settings.get('db.url', null);
        const password = await settings.get('db.password', null);
        const sUrl = injectPassword(url, password);

        return await createConnection({
            ...params,
            url: sUrl,
            type: 'postgres',
        });
    }
}
