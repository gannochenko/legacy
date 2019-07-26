import isObject from 'lodash.isobject';
// const random = require('lodash.random');
// const isNumber = require('lodash.isnumber');
import union from 'lodash.union';
import intersection from 'lodash.intersection';
import difference from 'lodash.difference';
import get from 'lodash.get';
import cloneDeep from 'lodash.clonedeep';
// const deepFreeze = require('deep-freeze-node');
// const isEqual = require('lodash.isequal');

export default {
    isArray: Array.isArray,
    isObject,
    isFunction: arg => typeof arg === 'function',
    union,
    intersection,
    difference,
    cloneDeep,
    get,
    iane: arg => {
        return Array.isArray(arg) && arg.length > 0;
    },
    ione: arg => {
        return isObject(arg) && Object.keys(arg).length > 0;
    },
    isne: arg => {
        return typeof arg === 'string' && !!arg.length;
    },
};
