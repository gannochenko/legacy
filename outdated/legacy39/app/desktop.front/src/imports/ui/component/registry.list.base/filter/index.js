import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import presetEnum from './preset.enum.js';

import levelEnum from '../../../../api/registry.object/enum/level.js';
import locationEnum from '../../../../api/registry.object/enum/area.js';
import kindEnum from '../../../../api/registry.object/enum/kind.js';
import categoryEnum from '../../../../api/registry.object/enum/category.js';
import conditionEnum from '../../../../api/registry.object/enum/condition.js';
import statusEnum from '../../../../api/registry.object/enum/status.js';

// function testIn(value, range = null) {
//     if (!value) {
//         return null; // good
//     }
//
//     if (_.isObjectNotEmpty(value)) {
//         if (!_.isArrayNotEmpty(value.$in)) {
//             return null; // good
//         } else {
//             if (range) {
//                 if(!_.difference(value.$in, range).length) {
//                     return null; // good, no bad values
//                 }
//             } else {
//                 return null; // good
//             }
//         }
//     }

//     return 'required'; // bad
// }

class Filter {
    validate(filter) {
        // only these keys are allowed
        filter = _.intersectKeys(filter, {
            _id: 1,
            status: 1,
            kind: 1,
            area: 1,
            level: 1,
            condition: 1,
            category: 1,
            inDanger: 1,
            favouriteFor: 1,
            remarkable: 1,
            $or: 1,
        });

        // todo: add more restrictions later

        return filter;
    }
}

export default new Filter();
