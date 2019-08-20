/**
 * A purpose of this class is to gracefully handle situations when
 * no cache endpoint provided
 */

import TagCache from 'redis-tag-cache';
import { injectPassword, decomposeURL } from './util';

export default class Cache {
    static async make(params = {}) {
        const { settings } = params;
        if (!settings) {
            throw new Error('No settings provided');
        }

        const url = await settings.get('cache.url', null);
        const password = await settings.get('cache.password', null);

        return new this({
            url,
            password,
        });
    }

    constructor(props = {}) {
        const { url, password } = props;
        this.cache = null;
        if (_.isStringNotEmpty(url)) {
            const sUrl = decomposeURL(injectPassword(url, password));
            if (sUrl === null) {
                // logger.warn('Illegal URL passed, will proceed without cache');
                return;
            }

            this.cache = new TagCache({
                redis: {
                    ...sUrl,
                    connectTimeout: 1000,
                },
            });
        }
    }

    async get(...args) {
        if (this.cache) {
            return this.cache.get(...args);
        }

        return null;
    }

    async set(...args) {
        if (this.cache) {
            return this.cache.set(...args);
        }

        return null;
    }

    async invalidate(...args) {
        if (this.cache) {
            return this.cache.invalidate(...args);
        }

        return null;
    }
}
