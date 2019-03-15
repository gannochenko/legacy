import Connection from './connection';

export default class ConnectionManager {
    constructor({ settings }) {
        this._settings = settings;
    }

    get() {}

    getSimple() {
        return Connection.make({
            settings: this._settings,
        });
    }
}
