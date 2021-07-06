import BaseEntity from '../../../lib/base/entity/entity.client.js';
import Entity from './entity.js';
import mix from '../../../lib/mixin.js';
import map from '../map/map.client.js';

export default class RegistryObjectImported extends mix(BaseEntity).with(Entity)
{
    static getMapInstance()
    {
        return map;
    }

    static getTitle()
    {
        return 'Imported';
    }
}
