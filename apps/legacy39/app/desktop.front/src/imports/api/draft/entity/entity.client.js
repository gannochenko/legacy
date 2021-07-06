import BaseEntity from '../../../lib/base/entity/entity.client.js';
import Entity from './entity.js';
import mix from '../../../lib/mixin.js';
import map from '../map/map.client.js';

export default class Draft extends mix(BaseEntity).with(Entity)
{
    static getMapInstance()
    {
        return map;
    }

    static getTitle()
    {
        return 'Draft';
    }

	static async save(id, data)
	{
	    if (data.payload instanceof BaseEntity)
        {
        	const pl = _.deepClone(this.differenceKeys(data, {payload: 1}));
        	pl.payload = data.payload.getData();
	        data = pl;
        }

		return super.save(id, data);
	}

	static differenceKeys(one, two)
	{
		if (_.isObject(one))
		{
			const twoKeys = Object.keys(two || {});
			const newOne = {};
			_.forEach(one, (v, k) => {
				if (twoKeys.indexOf(k) < 0)
				{
					newOne[k] = v;
				}
			});

			return newOne;
		}

		return one;
	}
}
