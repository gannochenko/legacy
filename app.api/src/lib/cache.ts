/**
 * A purpose of this class is to gracefully handle situations when
 * no cache endpoint provided
 */

// @ts-ignore
import TagCache from 'redis-tag-cache';
// @ts-ignore
import { Settings } from 'ew-internals';
import { injectPassword, decomposeURL } from './util';

interface TagCache {
    set(...args: any[]): Promise<void>;
    get(...args: any[]): Promise<any>;
    invalidate(...args: any[]): Promise<void>;
}

interface CacheParameters {
    settings: Nullable<Settings>;
}

export default class Cache {
    private readonly cache: Nullable<TagCache> = null;

    public static async make(params: CacheParameters = { settings: null }) {
        const { settings } = params;
        if (!settings) {
            throw new Error('No settings provided');
        }

        const url = (await settings.get('cache.еs.url', null)) as string;
        const password = (await settings.get(
            'cache.еs.password',
            null,
        )) as string;

        return new this({
            url,
            password,
        });
    }

    public constructor(props = { url: '', password: '' }) {
        const { url, password } = props;
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

    public async get(...args: any[]) {
        if (this.cache) {
            return this.cache.get(...args);
        }

        return null;
    }

    public async set(...args: any[]) {
        if (this.cache) {
            return this.cache.set(...args);
        }

        return null;
    }

    public async invalidate(...args: any[]) {
        if (this.cache) {
            return this.cache.invalidate(...args);
        }

        return null;
    }
}
