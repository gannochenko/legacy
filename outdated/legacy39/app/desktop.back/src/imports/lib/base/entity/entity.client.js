import Side from '../../util/side.js';
import Entity from './entity.js';
import clone from 'clone';
import minimongo from 'meteor/minimongo';

import Result from '../result';
import ActionResult from './util/action-result';

Side.ensureOnClient();

export default class BaseEntity extends Entity
{
    static getTitle()
    {
        return 'Spherical entity in vacuum';
    }

    static async findById(id, extra = {}, parameters = {})
    {
        // never ever mutate incoming parameters
        extra = _.deepClone(extra);

        const condition = {filter: {_id: id}};
        if ('select' in extra)
        {
            condition.select = extra.select;
        }

        return await this.findOne(condition, parameters);
    }

    static async findOne(condition = {}, parameters = {})
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
	    const result = await this.find(condition, parameters);

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

    static async find(condition = {}, parameters = {})
    {
        if (!_.isObject(condition))
        {
            throw new TypeError('Argument should be an object and may contain keys "filter", "select", etc.');
        }

        // never ever mutate incoming parameters
        condition = _.deepClone(condition);
        parameters = parameters || {};

        // qResult contains a structure
        let result = Result.hydrate(await this.executeMethod('find', [condition]));
	    const isVerbose = parameters.verbose === true;
	    const isArray = parameters.returnArray === true;

	    if (!isArray)
	    {
		    result.setData(result.getData().map(item => new this(item)));
	    }

	    if (isVerbose)
	    {
	    	return result;
	    }
	    else
	    {
		    return result.getData();
	    }
    }

    static async getCount(filter = {}, parameters = {})
    {
        // never ever mutate incoming parameters
        filter = _.deepClone(filter);

	    const isVerbose = parameters.verbose === true;

	    const result = Result.hydrate(await this.executeMethod('count.get', [filter]));

	    if (isVerbose)
	    {
		    return result;
	    }
	    else
	    {
		    return result.getData();
	    }
    }

    static async save(id, data)
    {
        return ActionResult.hydrate(await this.executeMethod('save', [id, data]));
    }

    static async remove(filter = {})
    {
        return ActionResult.hydrate(await this.executeMethod('remove', [filter]));
    }

    static async removeById(id)
    {
        return await this.remove({_id: id});
    }

    static async executeMethod(name, args)
    {
        return new Promise((resolve, reject) => {
            Meteor.apply(this.makeMethodName(name), args, (err, res) => {
                if (err)
                {
                    reject(err);
                    return;
                }

                resolve(res);
            });
        });
    }

    static makeMethodName(name)
    {
        return `${this.getUniqueCode()}.${name}`;
    }

    // todo: move on result object?
    static findPublished(condition = {})
    {
        let items = this.getReactiveVar().get();
        if (_.isArrayNotEmpty(items))
        {
            if (_.isObjectNotEmpty(condition))
            {
                // filter!
                const m = new minimongo.Minimongo.Matcher(condition);
                items = items.filter((item) => {
                    return m._docMatcher(item).result;
                });
            }

            return items.map((item) => {
                return new this(clone(item, false));
            });
        }

        return [];
    }

    // todo: move on result object?
    static findOnePublished(condition = {})
    {
        return this.findPublished(condition)[0];
    }

    static reloadPublished()
    {
        const rv = this.getReactiveVar();
        const items = this.getCollection().find().fetch();
        rv.set(items);
    }

    static getReactiveVar()
    {
        this._publishedVars = this._publishedVars || {};
        const code = this.getUniqueCode();
        if (!this._publishedVars[code]) {
            this._publishedVars[code] = new ReactiveVar(null);
        }

        return this._publishedVars[code];
    }

    async save()
    {
        const result = await this.constructor.save(this.getId(), this.getData());
        if (_.isStringNotEmpty(result.getId()))
        {
            this.setId(result.getId());
        }

        return result;
    }

    async remove()
    {
        if (this.isExist() && !this.isRemoved())
        {
            const result = await this.constructor.remove({_id: this.getId()});
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

	async populate()
	{
	}
}
