import Map from '../index.js';
import Entity from '../../entity/entity.js';
import Enum from '../../enum';
import Util from '../../../util.js';

export default class Attribute
{
    _data = null;
    _parameters = null;

    static getStrictArrayCondition(name)
    {
        return function ()
        {
            let value = this.field(name).value;
            if (!_.isArray(value))
            {
                return null;
            }

            value = value.filter(item => item !== undefined);

            if (!_.isArrayNotEmpty(value))
            {
                return 'required';
            }

            return null;
        };
    }

    constructor(data)
    {
        this._data = this.check(data);
        if (_.isObjectNotEmpty(data.parameter))
        {
            _.forEach(data.parameter, (value, name) => {
                this.setParameter(name, value);
            });
        }
    }

    isAttribute()
    {
        return true;
    }

    isString()
    {
        return this._data.type === String;
    }

    isNumber()
    {
        return this._data.type === Number;
    }

    isBoolean()
    {
        return this._data.type === Boolean;
    }

    isDate()
    {
        return this._data.type === Date;
    }

    isMap()
    {
        return this._data.type instanceof Map;
    }

    isLink()
    {
        return this._data.type.prototype instanceof Entity;
    }

    isArray()
    {
        return _.isArray(this._data.type);
    }

    isArrayOfString()
    {
        const a = this._data;
        return this.isArray() && a.type[0] === String;
    }

    isArrayOfNumber()
    {
        const a = this._data;
        return this.isArray() && a.type[0] === Number;
    }

    isArrayOfBoolean()
    {
        const a = this._data;
        return this.isArray() && a.type[0] === Boolean;
    }

    isArrayOfDate()
    {
        const a = this._data;
        return this.isArray() && a.type[0] === Date;
    }

    isArrayOfMap()
    {
        const a = this._data;
        return this.isArray() && a.type[0] instanceof Map;
    }

    isArrayOfLink()
    {
        const a = this._data;
        return this.isArray() && (a.type[0].prototype instanceof Entity);
    }

    isLinkAny()
    {
        return this.isLink() || this.isArrayOfLink();
    }

    isReference()
    {
        return !!this._data.isReference;
    }

    getLinkCollection()
    {
        if (this.isLink())
        {
            return this._data.type.getCollection();
        }
        else if (this.isArrayOfLink())
        {
            return this._data.type[0].getCollection();
        }

        return null;
    }

    getLinkType()
    {
        if (this.isLink())
        {
            return this.getType();
        }
        else if(this.isArrayOfLink())
        {
            return this.getArrayType();
        }

        return null;
    }

    getBaseType()
    {
        return this.getArrayType() || this.getType();
    }

    // special
    isStringDiscreet()
    {
        const a = this._data;
        return (this.isArrayOfString() || this.isString())
                && a.allowedValues instanceof Enum;
    }

    getData()
    {
        return this._data;
    }

    getType()
    {
        return this._data.type;
    }

    setType(type)
    {
        this._data.type = type;
    }

    getArrayType()
    {
        if (this.isArray())
        {
            return this._data.type[0];
        }

        return null;
    }

    setArrayType(type)
    {
        if (this.isArray())
        {
            return this._data.type[0] = type;
        }
    }

    getCode()
    {
        return this._data.code;
    }

    getLabel()
    {
        return this._data.label || '';
    }

    getCustom()
    {
        return this._data.custom || null;
    }

    getTitle()
    {
        const label = this.getLabel();
        if (label)
        {
            return label;
        }

        return Util.transformCamel(this.getCode());
    }

    getOrder()
    {
        return this._data.order;
    }

    isOptional()
    {
        return this._data.optional === true;
    }

    isCutaway()
    {
        return this.getOrder() === 0;
    }

    isAutoSelectable()
    {
        return this._data.autoSelect !== false;
    }

    hasMinCount()
    {
        return 'minCount' in this._data;
    }

    getMinCount()
    {
        const num = parseInt(this._data.minCount);
        if (!isNaN(num))
        {
            return num;
        }
        return 0;
    }

    getMaxCount()
    {
        const num = parseInt(this._data.maxCount);
        if (!isNaN(num))
        {
            return num;
        }
        return 9999999;
    }

    getOptional()
    {
        if ('optional' in this._data)
        {
            return this._data.optional;
        }

        return false;
    }

    setOptional(way)
    {
        this.getData().optional = !!way;
    }

    getAllowedValues()
    {
        return this._data.allowedValues || null;
    }

    getSchemaFieldList()
    {
        return {
            type: 1, optional: 1, allowedValues: 1,
            defaultValue: 1, custom: 1, label: 1,
            maxCount: 1, minCount: 1, regEx: 1, decimal: 1, blackbox: 1,
        };
    }

    getClonableFielList()
    {
        return [
            'code', 'optional', 'label', 'order',
            'allowedValues', 'defaultValue', 'custom',
            'isReference', 'referenceToCode' /*todo: bad*/, 'regEx', 'decimal', 'blackbox',
        ];
    }

    getSchemaFields()
    {
        return _.intersectKeys(this._data, this.getSchemaFieldList());
    }
    
    clone()
    {
        // copy base data by value
        const copyData = _.pick(this._data, this.getClonableFielList());

        // copy type
        let type = null;
        if (this.isArray())
        {
            type = [];
            if (this.isArrayOfMap())
            {
                // clone sub-map
                type.push(this.getArrayType().clone());
            }
            else
            {
                type.push(this.getArrayType());
            }
        }
        else
        {
            if (this.isMap())
            {
                // clone map
                type = this.getType().clone();
            }
            else
            {
                type = this.getType();
            }
        }

        copyData.type = type;

        // copy parameters?

        return new this.constructor(copyData);
    }

    hasParameter(name)
    {
        return this._parameters && name in this._parameters;
    }

    setParameter(name, value)
    {
        if (!_.isStringNotEmpty(name))
        {
            return;
        }

        if (this._parameters === null)
        {
            this._parameters = {};
        }

        this._parameters[name] = value;
    }

    getParameter(name)
    {
        if (!_.isObject(this._parameters))
        {
            return null;
        }

        if (!(name in this._parameters))
        {
            return null;
        }

        return this._parameters[name];
    }

    forEachParameter(cb)
    {
        return _.forEach(this._parameters, cb);
    }

    check(data)
    {
        // do some checking
        if (!_.isStringNotEmpty(data.code))
        {
            throw new ReferenceError('Field has no code');
        }

        if (!data.type || (_.isArray(data.type) && !data.type.length))
        {
            throw new ReferenceError(`Field '${data.code}' has no type`);
        }

        return data;
    }
}
