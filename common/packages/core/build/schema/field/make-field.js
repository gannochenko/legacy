'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const microdash_1 = __importDefault(require('@bucket-of-bolts/microdash'));
const field_type_1 = require('./field-type');
const constants_both_1 = require('../../constants.both');
const string_1 = require('./string');
const boolean_1 = require('./boolean');
const integer_1 = require('./integer');
const datetime_1 = require('./datetime');
const reference_1 = require('./reference');
const id_string_1 = require('./id-string');
exports.makeField = declaration => {
    let { type } = declaration;
    const { name } = declaration;
    if (!type) {
        return new string_1.StringField(declaration);
    }
    if (microdash_1.default.isArray(type)) {
        [type] = type;
    }
    if (!type) {
        return new string_1.StringField(declaration);
    }
    if (name === constants_both_1.ENTITY_ID_FIELD_NAME) {
        return new id_string_1.IdStringField(declaration);
    }
    if (type === field_type_1.FIELD_TYPE_STRING) {
        return new string_1.StringField(declaration);
    }
    if (type === field_type_1.FIELD_TYPE_BOOLEAN) {
        return new boolean_1.BooleanField(declaration);
    }
    if (type === field_type_1.FIELD_TYPE_INTEGER) {
        return new integer_1.IntegerField(declaration);
    }
    if (type === field_type_1.FIELD_TYPE_DATETIME) {
        return new datetime_1.DateTimeField(declaration);
    }
    return new reference_1.ReferenceField(declaration);
};
//# sourceMappingURL=make-field.js.map
