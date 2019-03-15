import Connection from './connection';

// todo: make this class stateless
export default class ConnectionManager {
    constructor({ settings }) {
        this._settings = settings;
    }

    get({ entities, preConnect }) {
        return Connection.make({
            settings: this._settings,
            entities,
            preConnect,
        });
    }

    getSimple() {
        return Connection.make({
            settings: this._settings,
        });
    }
}
