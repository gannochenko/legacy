import DataLoader from 'dataloader';

export default class DataLoaderPool {
    constructor() {
        this.pool = {};
    }

    get(loaderId, fn) {
        if (!_.isStringNotEmpty(loaderId) || typeof fn !== 'function') {
            return null;
        }

        if (!this.pool[loaderId]) {
            this.pool[loaderId] = new DataLoader(fn);
        }

        return this.pool[loaderId];
    }
}
