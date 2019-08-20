/* eslint import/no-unresolved: 0 */

import isObject from 'lodash.isobject';
import union from 'lodash.union';
import unique from 'lodash.uniq';

export default {
    isArray: Array.isArray,
    isString: arg => typeof arg === 'string',
    isObject,
    union,
    isArrayNotEmpty: arg => {
        return Array.isArray(arg) && arg.length > 0;
    },
    isObjectNotEmpty: arg => {
        return isObject(arg) && Object.keys(arg).length > 0;
    },
    isStringNotEmpty: arg => {
        return typeof arg === 'string' && arg.length > 0;
    },
    unique,
};
