/* eslint-disable import/no-duplicates */
import lodash from './lib/lodash';

declare global {
    import lodash from './lib/lodash';

    declare const _ = lodash;
    declare const __DEV__: boolean;
    declare const __TEST__: boolean;
    declare const __SERVER__: boolean;
    declare const __CLIENT__: boolean;
}
