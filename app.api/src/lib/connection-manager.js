import Connection from './connection';
import SchemaEntity from '../entity/schema';
import migrations from '../migrations';
import { DB_MIGRATION_TABLE_NAME } from '../constants';

export default class ConnectionManager {
    constructor({ settings }) {
        this._settings = settings;
        this._connections = {};
    }

    async get({ entities, preConnect }) {
        if (!this._connections.entity) {
            this._connections.entity = Connection.make({
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
            console.dir(migrations);
            this._connections.simple = Connection.make({
                name: 'system',
                settings: this._settings,
                preConnect: true,
                entities: [
                    SchemaEntity,
                    // todo: user entity, group entity
                ],
                migrationsTableName: 'custom_migration_table',
                // migrations,
            });
        }
        return this._connections.simple;
    }

    async invalidateConnections() {
        // todo
    }
}
