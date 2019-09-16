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
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const yup = __importStar(require('yup'));
const microdash_1 = __importDefault(require('@bucket-of-bolts/microdash'));
const base_1 = require('./base');
class ReferenceField extends base_1.BaseField {
    async getHealth() {
        const errors = await super.getHealth();
        const name = this.getName();
        const unique = this.isUnique();
        const preview = this.isPreview();
        if (unique) {
            errors.push({
                message: 'The reference field should not be declared as unique',
                code: 'field_reference_unique_conflict',
                fieldName: name,
            });
        }
        if (preview) {
            errors.push({
                message:
                    'The reference field should not be declared as preview',
                code: 'field_reference_preview_conflict',
                fieldName: name,
            });
        }
        return errors;
    }
    isReference() {
        return true;
    }
    getReferencedEntityName() {
        return this.getActualType();
    }
    createValueItemValidator() {
        return yup.string().typeError(this.getTypeErrorMessage('a string'));
    }
    castValueItem(value) {
        if (value !== undefined && value !== null) {
            return value.toString();
        }
        return null;
    }
    castValue(value) {
        if (this.isMultiple()) {
            if (microdash_1.default.isArray(value)) {
                return microdash_1.default
                    .unique(value.map(subValue => this.castValueItem(subValue)))
                    .filter(x => !!x);
            }
            return [];
        }
        return this.castValueItem(value);
    }
}
exports.ReferenceField = ReferenceField;
//# sourceMappingURL=reference.js.map
