import isString from 'lodash.isstring';
import isObject from 'lodash.isobject';
// import random from 'lodash.random';
// import isNumber from 'lodash.isnumber';
import isFunction from 'lodash.isfunction';
// import union from 'lodash.union';
// import intersection from 'lodash.intersection';
// import difference from 'lodash.difference';
import get from 'lodash.get';
import cloneDeep from 'lodash.clonedeep';
// import deepFreeze from deep-freeze-node';
// import isEqual from 'lodash.isequal';
import debounce from 'lodash.debounce';
import unique from 'lodash.uniq';

export default {
    isArray: Array.isArray,
    isObject,
    iane: arg => {
        return Array.isArray(arg) && arg.length > 0;
    },
    ione: arg => {
        return isObject(arg) && Object.keys(arg).length > 0;
    },
    isString,
    isne: arg => {
        return isString(arg) && arg.length > 0;
    },
    isStringNotEmpty: arg => {
        return isString(arg) && arg.length > 0;
    },
    isDate: arg => arg instanceof Date,
    get,
    isFunction,
    cloneDeep,
    debounce,
    unique,
};
