import Side from '../../util/side.js';
import Entity from './entity.js';
import Result from '../result';
import ActionResult from './util/action-result';

Side.ensureOnServer();

export default class BaseEntity extends Entity
{
    static findById(id, extra = {}, parameters = {})
    {
        // never ever mutate incoming parameters
        extra = _.deepClone(extra);
        parameters = parameters || {};

        const condition = {filter: {_id: id}};
        if ('select' in extra)
        {
            condition.select = extra.select;
        }

        return this.findOne(condition, parameters);
    }

    static findOne(condition = {}, parameters = {})
    {
        if (!_.isObject(condition))
        {
            throw new TypeError('Argument should be an object and may contain keys "filter", "select", etc.');
        }

        // never ever mutate incoming parameters
        condition = _.deepClone(condition);
        parameters = parameters || {};

	    const isVerbose = parameters.verbose === true;

        condition.limit = 1;
        const result = this.find(condition, parameters);

        if (isVerbose)
        {
	        if (_.isArrayNotEmpty(result.getData()))
	        {
		        result.setData(result.getData()[0]);
	        }
	        else
	        {
	        	result.setData(null);
	        }

	        return result;
        }
        else
        {
            if (_.isArrayNotEmpty(result))
            {
                return result[0];
            }

            return null;
        }
    }

    /**
     * @param condition
     * @param parameters
     */
    static find(condition = {}, parameters = {})
    {
        // never ever mutate incoming parameters
        condition = _.deepClone(condition);
        parameters = parameters || {};

        /**
         * todo: we could also support both ways of syntax of condition:
         * {filter: {}, select: {}, ...}
         * {_id: 'asdfasfd', ...} - in this case, the whole condition parameter is treated as a filer, like in a classic mongo approach
         *
         * Or maybe replace prefixise reserved keys with $, like filter => $filter, select => $select and so on...
         */
        let qResult = this.createQuery(condition).fetch();
        const isVerbose = parameters.verbose === true;
        const asPlain = parameters.returnArray === true || parameters.asPlainObject === true;

        if (!asPlain)
        {
	        qResult = qResult.map(item => new this(item));
        }

        if (isVerbose)
        {
	        const result = new Result();
	        result.setData(qResult);

	        return result;
        }
        else
        {
            return qResult;
        }
    }

    /**
     * Server-side, sync
     * @param filter
     * @param parameters
     * @returns {*}
     */
    static getCount(filter, parameters = {})
    {
        // never ever mutate incoming parameters
        filter = _.deepClone(filter);
	    parameters = parameters || {};

	    const isVerbose = parameters.verbose === true;

	    const count = this.getCollection().find(filter || {}, {}).count();

	    if (isVerbose)
        {
	        const result = new Result();
	        result.setData(count);

	        return result;
        }
        else
        {
            return count;
        }
    }

    getRawCollection()
    {
        return this.getCollection().rawCollection();
    }

    /**
     * todo: think about the result object...
     * @param id
     * @param data
     * @returns boolean|string todo: probably return Result here
     */
    static save(id, data)
    {
        const result = new ActionResult();

        if (!_.isObject(data))
        {
            result.addError(new Error('Empty data'));
            return result;
        }

        // never ever mutate incoming parameters
        data = _.deepClone(data);

        const collection = this.getCollection();
        try
        {
            if (this.onBeforeSave(id, data, result) === false)
            {
                result.cancel();
                return result;
            }
        }
        catch(e)
        {
            result.addError(e);
            return result;
        }

        try
        {
            if (!_.isStringNotEmpty(id))
            {
                id = collection.insert(data);
                if (_.isStringNotEmpty(id))
                {
                    this.onAfterSave(id, data, result);
                }
                else
                {
                    result.addError(new Error('Unable to insert'));
                }
            }
            else
            {
                delete data._id;

                try {
                    collection.update({
                        _id: id,
                    }, {
                        $set: this.flatten(data),
                    })
                } catch(e) {
                    result.addError(e);
                }

                this.onAfterSave(id, data);
            }

            result.setId(id);
        }
        catch(e)
        {
            result.addError(e);
            return result;
        }

        // something else?

        return result;
    }

    /**
     * todo: think about the result object...
     * @param filter
     * @return boolean todo: probably return Result here
     */
    static remove(filter = {})
    {
        // never ever mutate incoming parameters
        filter = _.deepClone(filter);

        const result = new ActionResult();

        if (this.onBeforeRemove(filter) === false)
        {
            result.cancel();
            return result;
        }

        try
        {
            if (this.getCollection().remove(filter))
            {
                this.onAfterRemove(filter);
            }
            else
            {
                result.addError(new Error('Unable to remove'));
            }
        }
        catch(e)
        {
            result.addError(e);
            return result;
        }

        return result;
    }

    static getRawCollection()
    {
        return this.getCollection().rawCollection();
    }

    // static hooks

    static onBeforeSave()
    {
    }

    static onAfterSave()
    {
    }

    static onBeforeRemove()
    {
    }

    static onAfterRemove()
    {
    }

    save()
    {
        const result = this.constructor.save(this.getId(), this.getData());
        if (_.isStringNotEmpty(result.getId()))
        {
            this.setId(result.getId());
        }

        return result;
    }

    remove()
    {
        if (this.isExist() && !this.isRemoved())
        {
            const result = this.constructor.remove({_id: this.getId()});
            if (result.isSuccess())
            {
                this.setRemoved();
                return result;
            }
        }
        else
        {
            const result = new ActionResult();
            result.addError(new Error('Trying to remove non-existing or already removed element'));

            return result;
        }
    }

    populate()
    {
        // todo
    }

    /**
     * @deprecated
     */
    static exposeGrapher()
    {
        this.collection.expose({
            maxLimit: 1000,
            maxDepth: 5,
            // restrictedFields: this.restrictedFields, // array of fields you want to restrict
            method: true,
            publication: false,
            //restrictLinks: this.restrictedLinks,
            //body, // object that will intersect with the actual request body from the client
        });
    }
}
