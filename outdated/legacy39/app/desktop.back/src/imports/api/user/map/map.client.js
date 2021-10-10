import BaseMap from '../../../lib/base/map';
import MapBoth from './map.js';
import mix from '../../../lib/mixin.js';

import UserGroupEntity from '../../user.group/entity/entity.client.js';

class Map extends mix(BaseMap).with(MapBoth)
{
    getLinkedEntityMap()
    {
        return {
            group: UserGroupEntity,
        };
    }
}

export default new Map();
