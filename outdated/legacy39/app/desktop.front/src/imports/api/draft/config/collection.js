import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import Collection from '../../../lib/base/collection/collection.js';

export default new class extends Collection
{
    constructor()
    {
        super('draft');
    }
}
