import {flatten} from 'mongo-dot-notation';

import Map from '../map';

/**
 * @abstract
 * @mixin
 */
export default class BaseEntity
{
    static DEFAULT_PAGE_SIZE = 20;

    // this is a singleton, use collection.getName() here!
    static _cache = {
        q: {},
    };
    static _qConstructor = null;

    static getCollectionInstance()
    {
        this.throwNotImplemented('static getCollectionInstance()');
    }

    static getMapInstance()
    {
        this.throwNotImplemented('static getMapInstance()');
    }

    /**
     * Returns a unique code of the entity. In most cases this code can be equal to
     * the collection name (as it is a singleton), but if you want to have several
     * entities that store data in one collection, codes should be different.
     */
    static getUniqueCode()
    {
        return this.getCollectionInstance().getNameNormalized();
    }

    /**
     * This function returns the same as getCollection().getSchema(), but extended, with
     * a few new attributes and including links
     * // todo: move all to getMap()
     * // todo: make it cached
     * @returns {*}
     */
    static getMap(filter = null)
    {
        const map = this.getMapInstance();

        if (filter)
        {
            return map.filter(filter);
        }

        return map;
    }

    static getCollection()
    {
        const instance = this.getCollectionInstance();
        if (!instance.isInitialized())
        {
            const map = this.getMap();
            if (!(map instanceof Map))
            {
                throw new TypeError('Entity map is not an instance of Map');
            }
            instance.initialize(map);
        }

        return instance;
    }

    static prepareQuery(condition)
    {
        if (this.isQuery(condition))
        {
            return condition;
        }
        else
        {
            return this.createQuery(condition);
        }
    }

    static flatten(value)
    {
        return flatten(value).$set;
    }

    static isQuery(value)
    {
        return value instanceof this.getSampleQConstructor();
    }

    static createQuery(parameters, name = '')
    {
        if (_.isStringNotEmpty(name) && name in this._cache.q)
        {
            return this._cache.q[name];
        }

        const q = this.getCollection().createQuery(
            this.translateParameters(parameters)
        );

        this.patchQueryPrototype(q);

        if (_.isStringNotEmpty(name))
        {
            this._cache.q[name] = q;
        }
        
        return q;
    }

    static getSampleQConstructor()
    {
        if (this._qConstructor === null)
        {
            const sample = this.getCollection().createQuery();
            this._qConstructor = sample.constructor;
        }

        return this._qConstructor;
    }

    static translateParameters(parameters)
    {
        if (!_.isObjectNotEmpty(parameters))
        {
            return {};
        }

        const translated = {};

        // todo: implement * in select here
        if (_.isArrayNotEmpty(parameters.select))
        {
            parameters.select.forEach((field) => {
                translated[field] = 1;
            });
        }
        else if (_.isObjectNotEmpty(parameters.select))
        {
            Object.assign(translated, parameters.select);
        }
        else if(parameters.select === '#')
        {
            Object.assign(translated, this.getAutoSelect());
        }
        else if(parameters.select === '*')
        {
            Object.assign(translated, this.getFullSelect());
        }
        // todo: also can process regexp

        translated.$options = translated.$options || {};

        const sort = parameters.sort || parameters.order;
        if (_.isObjectNotEmpty(sort))
        {
            translated.$options.sort = sort;
            // translated.$options.sort = this.translateParamtersSort(parameters.sort);
        }

        if (_.isObjectNotEmpty(parameters.filter))
        {
            translated.$filters = parameters.filter;
        }
        else if(_.isFunction(parameters.filter))
        {
            translated.$filter = parameters.filter;
        }

        if (!('$filter' in translated)) {
            translated.$filter = this.getFilterApplier();
        }

        if ('limit' in parameters)
        {
            translated.$paginate = true;
            translated.$options.limit = parseInt(parameters.limit);
        }
        if ('offset' in parameters)
        {
            translated.$paginate = true;
            translated.$options.skip = parseInt(parameters.offset);
        }
        else if ('skip' in parameters) // synonym for "offset"
        {
            translated.$paginate = true;
            translated.$options.skip = parseInt(parameters.skip);
        }
        else if ('page' in parameters)
        {
            parameters.page = parseInt(parameters.page);
            if (isNaN(parameters.page))
            {
                throw new TypeError('Illegal page');
            }
            else if (parameters.page <= 0)
            {
                throw new TypeError('Page number should start from 1');
            }

            translated.$paginate = true;
            if (!('limit') in translated.$options)
            {
                translated.$options.limit = this.DEFAULT_PAGE_SIZE;
            }

            translated.$options.skip = translated.$options.limit * (parameters.page - 1);
        }
        
        return translated;
    }

    static translateParamtersSort(sort)
    {
        return sort.reduce((result, item) => {

            // todo: this will be unordered
            result[item[0]] = item[1] === 1 ? 1 : -1;

            // qParameters.$options.sort.push([
            // 	item[0], // todo: check legal field
            // 	item[1] === 'desc' ? 'desc' : 'asc'
            // ]);

            return result;
        }, {});
    }

    static getAutoSelect()
    {
        return this.getMap().getAutoSelectableProjection();
    }

    static getFullSelect()
    {
        return this.getMap().getProjection();
    }

    static clearCaches()
    {
        this._cache = {
            q: {}
        };
    }

    /**
     * nasty
     */
    static patchQueryPrototype(q)
    {
        if (!('filter' in q.constructor.prototype))
        {
            q.constructor.prototype.filter = this.getFilterForwarder();
        }
    }

    static getFilterApplier() {
        return ({filters, params}) => {
            if (_.isObject(params.filter)) {
                Object.assign(filters, params.filter);
            }
        };
    }

    static getFilterForwarder()
    {
        return function (filter) {
            this.setParams({
                filter,
            });

            return this;
        };
    }

    static throwNotImplemented(fn)
    {
        throw new Error(`Not implemented: ${fn}`);
    }

    // todo: deprecated, replace with getMap() and remove
    static getAttributes()
    {
        const result = [];
        _.forEach(this.getCollection().getSchema(), (attribute, code) => {
            result.push({
                code,
                label: attribute.label,
                type: attribute.type,
            });
        });
        
        // result.sort(Util.getNumericComparator());

        return result;
    }

    static getCutawayAttributeCode()
    {
        return this.getMap().getCutawayAttribute().getCode();
    }

	_data = {};
	_normalized = false;

    constructor(data = {})
    {
        if (_.isObjectNotEmpty(data))
        {
            this._data = data;
        }
    }

    getCollection()
    {
        return this.constructor.getCollection();
    }

    getMap(filter)
    {
        return this.constructor.getMap(filter);
    }

    getId()
    {
        return this._data._id;
    }

    setId(id)
    {
        this.getData()._id = id;
    }

    getData()
    {
        if (!this._normalized)
        {
            this._data = this.normalizeData(this._data);
            this._normalized = true;
        }

        return this._data;
    }

    extractData()
    {
        return _.deepClone(this.getData());
    }

    setData(data)
    {
        this._data = data;
    }

    putData(data)
    {
        this._data = this.normalizeData(_.deepClone(data));
    }

    mergeData(data)
    {
        Object.assign(this._data, data);
    }

    normalizeData(data)
    {
        return this._normalize(data);
    }

    _normalize(data)
    {
        return data;
    }

    isExist()
    {
        return _.isStringNotEmpty(this.getId());
    }

    setRemoved()
    {
        this._removed = true;
    }

    isRemoved()
    {
        return !!this._removed;
    }

    getAttributeValue(code)
    {
        const getter = 'get'+_.uCFirst(code);
        if (_.isFunction(this[getter]))
        {
            return this[getter].call(this);
        }

        if (code in this._data)
        {
            return this._data[code];
        }

        return undefined;
    }

    makeInstances(point, type)
    {
        const constructor = this.getMap().$(type);
        if (!_.isFunction(constructor))
        {
            return null;
        }

        if (_.isArray(point))
        {
            // todo: optimize this
            return point.map((item, k) => {
                if (item instanceof constructor)
                {
                    return item;
                }
                if (_.isObjectNotEmpty(item)) {
                    // make entity

                    point[k] = new constructor(item);
                    return point[k];
                }

                return null;
            }).filter(item => item !== null);
        }
        else if(_.isObject(point))
        {
            if (point instanceof constructor)
            {
                return point;
            }

            return new constructor(point);
        }

        return null;
    }

    forEach(cb)
    {
        if (!_.isFunction(cb))
        {
            return;
        }

        this.getAttributes().forEach((attribute) => {
            cb(attribute);
        });
    }

    map(cb)
    {
        if (!_.isFunction(cb))
        {
            return;
        }

        const result = [];

        this.forEach((item) => {
            result.push(cb(item));
        });

        return result;
    }

    isEntity(arg)
    {
        return arg instanceof this.constructor;
    }

    getCreationDate()
    {
        return this.getData().creationDate || null;
    }

    getUpdateDate()
    {
        return this.getData().updateDate || null;
    }

    clone()
    {
        return new this.constructor(_.deepClone(this.getData()));
    }
}
