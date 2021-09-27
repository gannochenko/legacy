import BaseEntity from '../../../lib/base/entity/entity.server.js';
import Entity from './entity.js';
import mix from '../../../lib/mixin.js';
import map from '../map/map.server.js';
import ActionResult from '../../../lib/base/entity/util/action-result';

import {Accounts} from 'meteor/accounts-base';

export default class User extends mix(BaseEntity).with(Entity)
{
    static getMapInstance()
    {
        return map;
    }

    static onBeforeSave(id, data)
    {
        const profile = data.profile;
        if (_.isObjectNotEmpty(profile))
        {
            if (!id)
            {
                // new user
                profile.fullName = `${profile.firstName} ${profile.lastName}`;
            }
            else
            {
                // todo: update fullName also when user is pre-existed and one of *Name parameters was not specified
            }
        }
    }

    static save(id, data)
    {
	    const result = new ActionResult();

        if (!_.isObject(data))
        {
            return false;
        }

        const collection = this.getCollection();
        if (this.onBeforeSave(id, data) === false)
        {
	        result.cancel();
	        return result;
        }
        if (!_.isStringNotEmpty(id))
        {
            // create new
            if (!_.isStringNotEmpty(data.email) || !_.isStringNotEmpty(data.password))
            {
                // todo: improve this, make it transparent
                throw new TypeError('When creating a new user, you must provide email and password');
            }

            id = Accounts.createUser({
                email: data.email,
                password: data.password,
                profile: data.profile || {},
            });
        }
        else
        {
            // update
            if (_.isStringNotEmpty(data.password))
            {
                // for the client-side code use Accounts.changePassword()
                Accounts.setPassword(id, data.password);
            }
        }

	    result.setId(id);

        // just to be 100% sure...
        const updateData = _.clone(data);
        delete updateData.email;
        delete updateData.password;
        delete updateData.passwordPrevious;

        if(collection.update({
            _id: id,
        }, {
            $set: this.flatten(updateData),
        }))
        {
            this.onAfterSave(id, data);
        }

	    return result;
    }
}
