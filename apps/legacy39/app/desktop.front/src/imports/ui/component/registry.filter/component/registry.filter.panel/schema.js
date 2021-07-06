import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({
    flags: {
        type: [String],
        optional: true,
    },
    status: {
        type: [String],
        optional: true,
    },
    kind: {
        type: [String],
        optional: true,
    },
    area: {
        type: [String],
        optional: true,
    },
    level: {
        type: [String],
        optional: true,
    },
    condition: {
        type: [String],
        optional: true,
    },
    category: {
        type: [String],
        optional: true,
    },
});
