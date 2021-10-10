// underscore mixin

import clone from 'clone';
import deepEqual from 'deep-equal';

// =((((((
_.mixin({
    /**
     * Check if the argument is a string and it is not empty
     * @param {*} value
     * @returns {boolean}
     */
    isStringNotEmpty: function(value)
    {
        return _.isString(value) && value.length > 0;
    },

    isStringNotEmptyTrimmed: function(value)
    {
        if (!_.isString(value))
        {
            return false;
        }

        value = value.trim();

        return !!value.length;
    },

    /**
     * Check if the argument is an array and it is not empty
     * @param {*} value
     * @returns {boolean}
     */
    isArrayNotEmpty: function(value)
    {
        return _.isArray(value) && value.length > 0;
    },

    /**
     * Check if the argument is an object and it has some own keys
     * @param {*} value
     * @returns {boolean}
     */
    isObjectNotEmpty: function(value)
    {
        return _.isObject(value) && Object.keys(value).length > 0;
    },

    isPlainObject(value)
    {
        return _.isObject(value) && value.constructor === Object;
    },

    isExist(value)
    {
        return !_.isUndefined(value) && !_.isNull(value);
    },

    makeMap(data, field, unsetKey = false)
    {
        if (_.isArrayNotEmpty(data))
        {
            return data.reduce((result, item) => {
                const key = item[field];
                if (unsetKey)
                {
                    delete item[field];
                }
                result[key] = item;
                return result;
            }, {});
        }

        return {};
    },

    /**
     * Copyright Flavio Freitas
     * @param obj
     * @param path
     * @returns {*}
     */
    getValue: function(obj, path)
    {
        if (typeof obj === 'undefined' || obj === null) return;

        path = path.split(/[\.\[\]\"\']{1,2}/); // eslint-disable-line
        for (var i = 0, l = path.length; i < l; i += 1)
        {
            if (path[i] !== '')
            {
                obj = obj[path[i]];
                if (typeof obj === 'undefined' || obj === null) return;
            }
        }

        return obj; //eslint-disable-line
    },

    lCFirst: function(value)
    {
        if (_.isStringNotEmpty(value))
        {
            return value.substr(0, 1).toLowerCase() + value.substr(1);
        }

        return '';
    },

    uCFirst: function(value)
    {
        if (_.isStringNotEmpty(value))
        {
            return value.substr(0, 1).toUpperCase() + value.substr(1);
        }

        return '';
    },

    intersectKeys: function(one, two)
    {
        if (!_.isObject(one))
        {
            return one;
        }
        if (!_.isObjectNotEmpty(two))
        {
            return {};
        }

        return _.intersection(
            Object.keys(one),
            Object.keys(two)
        ).reduce(function(result, key) {
            result[key] = one[key];
            return result;
        }, {});
    },

    deepClone: function(value)
    {
        return clone(value, false);
    },

    deepEqual: function(one, two)
    {
        return deepEqual(one, two);
    },
});

// localization
import './i18n.js';
