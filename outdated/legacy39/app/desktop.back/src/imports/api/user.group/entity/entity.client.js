import BaseEntity from '../../../lib/base/entity/entity.client.js';
import Entity from './entity.js';
import mix from '../../../lib/mixin.js';
import map from '../map/map.client.js';

import ConsoleOutput from '../../../lib/util/console-output';

export default class UserGroup extends mix(BaseEntity).with(Entity)
{
    static _id2code = {};
    static PENDING_USERS_GROUP_CODE = 'P';
    static EDITOR_USERS_GROUP_CODE = 'E';
    static ADMIN_USERS_GROUP_CODE = 'A';

    static getMapInstance()
    {
        return map;
    }

    static getTitle()
    {
        return 'User group';
    }

    static loadData()
    {
        return this.executeMethod('codeMap.get').then((map) => {
            ConsoleOutput.dir('Groups data loaded...');

            this._id2code = map;
        }).catch((err) => {
            this._id2code = {};
        });
    }

    static getCodeById(id)
    {
        return this._id2code[id] || null;
    }

    static getCodesByIds(ids)
    {
        if (_.isArrayNotEmpty(ids))
        {
            return ids.map((id) => {
                return this.getCodeById(id);
            });
        }

        return [];
    }
}
