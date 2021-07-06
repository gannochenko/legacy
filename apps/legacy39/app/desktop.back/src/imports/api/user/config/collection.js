import Collection from '../../../lib/base/collection/collection.js';

import UserGroupCollection from '../../user.group/config/collection.js';

export default new class extends Collection
{
    constructor()
    {
        super(Meteor.users);
    }

    applyHooks()
    {
        // todo: generally, hooks are bad, move it to the business level
        this.getMongoCollection().before.insert(this.__onBeforeInsert.bind(this));
    }

    __onBeforeInsert(id, data)
    {
        // special hook for google oauth
        // todo: do the same for facebook!!!
        const google = _.getValue(data, 'services.google');
        if (_.isObjectNotEmpty(google))
        {
            const email = google.email;

            // check the email against the whitelist
            // throw new Meteor.Error(401, 'Not authorized');

            if (!_.isArrayNotEmpty(data.emails))
            {
                data.emails = [
                    {
                        address: email,
                        verified: google.verified_email,
                    }
                ];
            }

            if (!_.isObject(data.profile))
            {
                data.profile = {};
            }

            if (!_.isStringNotEmpty(data.profile.firstName))
            {
                data.profile.firstName = google.given_name;
            }

            if (!_.isStringNotEmpty(data.profile.lastName))
            {
                data.profile.lastName = google.family_name;
            }

            data.profile.fullName = `${data.profile.firstName} ${data.profile.lastName}`;

            // we can use white-listing by the domain of the email, or...
            // add user to the group of pending users
            const group = UserGroupCollection.findOne({
                code: 'P',
            });
            if (!_.isObjectNotEmpty(group)) {
                throw new Meteor.Error(500, 'Group for pending signups not found');
            }

            data.profile.groupId = [group._id];
        }
        else
        {
            if (!Meteor.isDevelopment)
            {
	            throw new Meteor.Error(400, 'You cant just come and create a new user');
            }
        }
    }
}
