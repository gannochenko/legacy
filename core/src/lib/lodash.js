import isString from 'lodash.isstring';
import isObject from 'lodash.isobject';
import union from 'lodash.union';

export default {
    isArray: Array.isArray,
    isString,
    union,
    iane: arg => {
        return Array.isArray(arg) && arg.length > 0;
    },
    ione: arg => {
        return isObject(arg) && Object.keys(arg).length > 0;
    },
    isne: arg => {
        return isString(arg) && arg.length > 0;
    },
};
