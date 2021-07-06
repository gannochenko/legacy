import PublicationBase from '../../../lib/base/publication/index.server.js';
import Entity from '../entity/entity.server.js';

export default class Publication extends PublicationBase
{
    static getEntity()
    {
        return Entity;
    }
}
