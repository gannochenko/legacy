import DataLoader, { BatchLoadFn } from 'dataloader';

export default class DataLoaderPool {
    private readonly pool: StringMap<DataLoader<unknown, unknown>> = {};

    public get(loaderId: string, fn: BatchLoadFn<unknown, unknown>) {
        if (!_.isStringNotEmpty(loaderId) || typeof fn !== 'function') {
            return null;
        }

        if (!this.pool[loaderId]) {
            this.pool[loaderId] = new DataLoader(fn);
        }

        return this.pool[loaderId];
    }
}
