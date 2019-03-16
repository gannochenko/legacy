import Connection from './connection';

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

    async getSimple() {
        if (!this._connections.simple) {
            this._connections.simple = Connection.make({
                name: 'technical',
                settings: this._settings,
                preConnect: true,
            });
        }
        return this._connections.simple;
    }

    async invalidateConnections() {
        // todo
    }
}
