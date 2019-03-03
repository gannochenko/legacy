/**
 * A purpose of this class is to gracefully handle situations when
 * no cache endpoint provided
 */

import TagCache from 'redis-tag-cache';
import { injectPassword, decomposeURL } from './util';

export default class Cache {
    static async make(params = {}) {
        if (!this._instance) {
            const { settings } = params;
            if (!settings) {
                throw new Error('No settings provided');
            }

            const url = await settings.get('cache.url', null);
            const password = await settings.get('cache.password', null);

            this._instance = new this({
                url,
                password,
            });
        }

        return this._instance;
    }

    constructor(props = {}) {
        const { url, password } = props;
        this._cache = null;
        if (_.isne(url)) {
            const sUrl = decomposeURL(injectPassword(url, password));
            if (sUrl === null) {
                // logger.warn('Illegal URL passed, will proceed without cache');
                return;
            }

            this._cache = new TagCache({
                redis: {
                    ...sUrl,
                    connectTimeout: 1000,
                },
            });
        }
    }

    async get(...args) {
        if (this._cache) {
            return await this._cache.get(...args);
        }

        return null;
    }

    async set(...args) {
        if (this._cache) {
            return await this._cache.set(...args);
        }

        return null;
    }

    async invalidate(...args) {
        if (this._cache) {
            return this._cache.invalidate(...args);
        }

        return null;
    }
}
