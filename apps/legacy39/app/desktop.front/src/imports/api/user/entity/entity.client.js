import BaseEntity from '../../../lib/base/entity/entity.client.js';
import Entity from './entity.js';
import mix from '../../../lib/mixin.js';
import map from '../map/map.client.js';

import UserGroup from '../../user.group/entity/entity.client.js';

export default class User extends mix(BaseEntity).with(Entity)
{
    static getMapInstance()
    {
        return map;
    }

    static getTitle()
    {
        return 'User';
    }

    isPending() {
        const groups = this.getGroupIds();
        if (!_.isArrayNotEmpty(groups)) {
            return false;
        }

        const codes = UserGroup.getCodesByIds(groups);

        return _.contains(codes, UserGroup.PENDING_USERS_GROUP_CODE);
    }

    static isEditor()
    {
        if(!this.isAuthorized()) {
            return false;
        }

        const user = this.get();
        if (!user) {
            return false;
        }

        const groups = user.getGroupIds();
        if (!_.isArrayNotEmpty(groups)) {
            return false;
        }

        const codes = UserGroup.getCodesByIds(groups);

        return _.contains(codes, UserGroup.EDITOR_USERS_GROUP_CODE) || _.contains(codes, UserGroup.ADMIN_USERS_GROUP_CODE);
    }
}
