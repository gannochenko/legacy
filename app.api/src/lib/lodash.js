import isString from 'lodash.isstring';
import isObject from 'lodash.isobject';
// const random = require('lodash.random');
// const isNumber = require('lodash.isnumber');
import isFunction from 'lodash.isfunction';
import union from 'lodash.union';
// const intersection = require('lodash.intersection');
import difference from 'lodash.difference';
// const get = require('lodash.get');
// const cloneDeep = require('lodash.clonedeep');
// const deepFreeze = require('deep-freeze-node');
// const isEqual = require('lodash.isequal');

export default {
    isArray: Array.isArray,
    isObject,
    isFunction,
    union,
    difference,
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
