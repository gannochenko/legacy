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
const util_1 = require('@bucket-of-bolts/util');
const yup = __importStar(require('yup'));
const microdash_1 = __importDefault(require('@bucket-of-bolts/microdash'));
const field_type_1 = require('./field/field-type');
const constants_both_1 = require('../constants.both');
const make_field_1 = require('./field/make-field');
class Entity {
    constructor(declaration = {}) {
        this.declarationInternal = this.getSafeDeclaration(declaration);
    }
    set declaration(structure) {
        this.declarationInternal = structure;
    }
    get declaration() {
        return this.declarationInternal;
    }
    getSafeDeclaration(declaration = {}) {
        const safeDeclaration = { name: '', schema: [] };
        if (typeof declaration.name === 'string') {
            safeDeclaration.name = declaration.name;
        }
        if (
            declaration.schema &&
            microdash_1.default.isArrayNotEmpty(declaration.schema)
        ) {
            safeDeclaration.schema = declaration.schema.map(field =>
                make_field_1.makeField(field),
            );
        }
        return safeDeclaration;
    }
    async getHealth() {
        const errors = [];
        const { declaration } = this;
        if (!declaration.name.length) {
            errors.push({
                message: 'Entity does not have a name',
                code: 'entity_name_empty',
                entityName: '',
            });
        }
        if (!declaration.schema.length) {
            errors.push({
                message: 'Entity does not have a single field',
                code: 'entity_schema_empty',
                entityName: declaration.name || '',
            });
            return errors;
        }
        const times = {};
        declaration.schema.forEach(field => {
            times[field.getName()] =
                field.getName() in times ? times[field.getName()] + 1 : 1;
        });
        Object.keys(times).forEach(key => {
            if (times[key] > 1) {
                errors.push({
                    message: `Field "${key}" met several times`,
                    code: 'entity_field_duplicate',
                    fieldName: key,
                    entityName: declaration.name || '',
                });
            }
        });
        if (!times[constants_both_1.ENTITY_ID_FIELD_NAME]) {
            errors.push({
                message: `Entity does not have id field`,
                code: 'entity_no_id_field',
                entityName: declaration.name || '',
            });
        }
        await Promise.all(
            declaration.schema.map(field =>
                field.getHealth().then(fieldErrors => {
                    fieldErrors.forEach(fieldError => {
                        errors.push(
                            Object.assign({}, fieldError, {
                                entityName: declaration.name,
                            }),
                        );
                    });
                }),
            ),
        );
        return errors;
    }
    getName() {
        return this.declaration.name;
    }
    getCamelName() {
        return util_1.convertToCamel(this.getName().toLowerCase());
    }
    getDisplayName() {
        return util_1.uCFirst(this.getName()).replace(/_/g, ' ');
    }
    getFields() {
        return this.declaration.schema;
    }
    getReferences() {
        return this.getFields().filter(field => field.isReference());
    }
    getSingleReferences() {
        return this.getFields().filter(
            field => field.isReference() && !field.isMultiple(),
        );
    }
    getMultipleReferences() {
        return this.getFields().filter(
            field => field.isReference() && field.isMultiple(),
        );
    }
    getField(name) {
        return this.declaration.schema.find(field => field.getName() === name);
    }
    toJSON() {
        return this.declaration;
    }
    getPreviewField() {
        const preview = this.declaration.schema.find(
            field =>
                field.getType() === field_type_1.FIELD_TYPE_STRING &&
                field.getName() !== constants_both_1.ENTITY_ID_FIELD_NAME &&
                field.isPreview(),
        );
        if (preview) {
            return preview;
        }
        return (
            this.declaration.schema.find(
                field =>
                    field.getType() === field_type_1.FIELD_TYPE_STRING &&
                    field.getName() !== constants_both_1.ENTITY_ID_FIELD_NAME,
            ) || null
        );
    }
    getValidator() {
        const shape = {};
        this.declaration.schema.forEach(field => {
            shape[field.getName()] = field.getValidator();
        });
        return yup.object().shape(shape);
    }
    castData(data) {
        const processed = {};
        if (!microdash_1.default.isObjectNotEmpty(data)) {
            return processed;
        }
        this.getFields().forEach(field => {
            const name = field.getName();
            if (!(name in data)) {
                return;
            }
            processed[name] = field.castValue(data[name]);
        });
        return processed;
    }
    async validateData(sourceData) {
        let errors = [];
        try {
            await this.getValidator().validate(sourceData, {
                abortEarly: false,
            });
        } catch (validationErrors) {
            if (microdash_1.default.isArray(validationErrors.inner)) {
                errors = validationErrors.inner.map(error => ({
                    message: error.message,
                    code: 'validation',
                    fieldName: error.path,
                }));
            } else {
                errors = [
                    {
                        message: 'Internal error',
                        code: 'internal',
                        fieldName: '',
                    },
                ];
            }
        }
        return errors;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map
