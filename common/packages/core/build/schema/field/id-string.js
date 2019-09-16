'use strict';
var __importStar =
    (this && this.__importStar) ||
    function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result['default'] = mod;
        return result;
    };
Object.defineProperty(exports, '__esModule', { value: true });
const yup = __importStar(require('yup'));
const string_1 = require('./string');
const constants_both_1 = require('../../constants.both');
const field_type_1 = require('./field-type');
class IdStringField extends string_1.StringField {
    async getHealth() {
        const errors = await super.getHealth();
        const name = this.getName();
        const system = this.isSystem();
        const unique = this.isUnique();
        const length = this.getLength();
        if (!system) {
            errors.push({
                message: `The field should be declared as system-reserved: ${name}`,
                code: `field_not_system`,
                fieldName: name,
            });
        }
        if (!unique) {
            errors.push({
                message: `System field "${
                    constants_both_1.ENTITY_ID_FIELD_NAME
                }" should be unique`,
                code: 'field_id_not_unique',
                fieldName: name,
            });
        }
        if (this.getActualType() !== field_type_1.FIELD_TYPE_STRING) {
            errors.push({
                message: `System field "${
                    constants_both_1.ENTITY_ID_FIELD_NAME
                }" should be string`,
                code: 'field_id_not_string',
                fieldName: name,
            });
        }
        if (this.isMultiple()) {
            errors.push({
                message: `System field "${
                    constants_both_1.ENTITY_ID_FIELD_NAME
                }" should not be multiple`,
                code: 'field_id_multiple',
                fieldName: name,
            });
        }
        if (
            length !== null &&
            length !== constants_both_1.ENTITY_ID_FIELD_LENGTH
        ) {
            errors.push({
                message: `System field "${
                    constants_both_1.ENTITY_ID_FIELD_NAME
                }" should have length of ${
                    constants_both_1.ENTITY_ID_FIELD_LENGTH
                }`,
                code: 'field_id_illegal_length',
                fieldName: name,
            });
        }
        return errors;
    }
    createValueItemValidator() {
        return yup
            .string()
            .length(
                constants_both_1.ENTITY_ID_FIELD_LENGTH,
                `Field '${this.getDisplayName()}' should be ${
                    constants_both_1.ENTITY_ID_FIELD_LENGTH
                } characters long`,
            )
            .typeError(this.getTypeErrorMessage('a string'));
    }
}
exports.IdStringField = IdStringField;
//# sourceMappingURL=id-string.js.map
