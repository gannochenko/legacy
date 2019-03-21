import DataLoader from 'dataloader';

export default class DataLoaderPool {
    constructor() {
        this._pool = {};
    }

    get(loaderId, fn) {
        if (!_.isne(loaderId) || !_.isFunction(fn)) {
            return null;
        }

        if (!this._pool[loaderId]) {
            this._pool[loaderId] = new DataLoader(fn);
        }

        return this._pool[loaderId];
    }
}
