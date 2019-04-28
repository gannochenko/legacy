import { uCFirst } from 'ew-internals';
import * as yup from 'yup';
import Field, {
    TYPE_STRING,
    TYPE_INTEGER,
    TYPE_DATETIME,
    TYPE_BOOLEAN,
} from './field';
import CodeField from './code-field';
import { convertToCamel } from '../../common/lib/util';
import {
    ENTITY_USER_NAME,
    ENTITY_GROUP_NAME,
    ENTITY_CODE_FIELD_NAME,
} from '../constants';

export default class Entity {
    constructor(declaration) {
        if (!_.ione(declaration)) {
            declaration = {};
        }
        if (!_.iane(declaration.schema)) {
            declaration.schema = [];
        }

        this._schema = {
            name: declaration.name || '',
            schema: declaration.schema.map(field =>
                field.name === ENTITY_CODE_FIELD_NAME
                    ? new CodeField(field)
                    : new Field(field),
            ),
        };
    }

    checkHealth() {
        let errors = [];
        const schema = this._schema;

        // check that field has a name
        if (!_.isne(schema.name)) {
            errors.push({
                message: 'Entity does not have a name',
                code: 'entity_name_empty',
                reference: null,
            });
        }

        // check schema
        if (!_.iane(schema.schema)) {
            errors.push({
                message: 'Entity does not have a single field',
                code: 'entity_schema_empty',
                reference: schema.name,
            });
        }

        // todo: check if "code" field is still present

        // check health of each field
        const times = {};
        schema.schema.forEach(field => {
            const fErrors = field.checkHealth();
            if (_.iane(fErrors)) {
                errors = _.union(errors, fErrors);
            }

            if (field.getName() in times) {
                errors.push({
                    message: `Field "${field.getName()}" met several times`,
                    code: 'entity_field_duplicate',
                    reference: schema.name,
                });
            }

            times[field.getName()] =
                field.getName() in times ? times[field.getName()] + 1 : 1;
        });

        if (!(ENTITY_CODE_FIELD_NAME in times)) {
            errors.push({
                message: `System field "code" is missing`,
                code: 'entity_code_field_missing',
                reference: schema.name,
            });
        }

        // check that entity does not have a reserved name
        if (
            _.isne(schema.name) &&
            (schema.name === ENTITY_USER_NAME ||
                schema.name === ENTITY_GROUP_NAME)
        ) {
            errors.push({
                message: 'Entity name is a reserved name',
                code: 'entity_name_reserved',
                reference: schema.name,
            });
        }

        return errors;
    }

    getName() {
        return this._schema.name;
    }

    getCamelName() {
        return convertToCamel(this.getName().toLowerCase());
    }

    getDisplayName() {
        return uCFirst(this.getName()).replace(/_/g, ' ');
    }

    getReferences() {
        return this._schema.schema
            .map(field =>
                _.isne(field.getReferenceFieldName()) ? field : null,
            )
            .filter(x => x);
    }

    getFields() {
        return this._schema.schema;
    }

    toJSON() {
        return this._schema;
    }

    // aux
    getPresentationField() {
        return (
            this._schema.schema.find(
                field =>
                    field.getType() === TYPE_STRING &&
                    field.getName() !== ENTITY_CODE_FIELD_NAME,
            ) || null
        );
    }

    getValidator() {
        const shape = {};
        this._schema.schema.forEach(field => {
            let rule = null;

            // type
            if (field.isReference()) {
                rule = yup.string();
            } else {
                const type = field.getActualType();
                if (type === TYPE_INTEGER) {
                    rule = yup.number().integer();
                } else if (type === TYPE_BOOLEAN) {
                    rule = yup.boolean();
                } else if (type === TYPE_DATETIME) {
                    rule = yup.date();
                } else {
                    rule = yup.string();
                }
            }

            // multiple
            if (field.isMultiple()) {
                rule = yup.array().of(rule);
            }

            // required
            if (field.isMandatory()) {
                rule = rule.required(`${field.getDisplayName()} is required`);
            } else {
                rule = rule.nullable();
            }

            shape[field.getName()] = rule;
        });

        return yup.object().shape(shape);
    }

    prepareData(data) {
        const processed = {};

        if (!_.ione(data)) {
            return processed;
        }

        this.getFields().forEach(field => {
            const name = field.getName();
            if (name === ENTITY_CODE_FIELD_NAME) {
                return;
            }

            if (!(name in data)) {
                return;
            }

            let value = data[name];

            if (field.isMultiple()) {
                if (!_.isArray(value)) {
                    value = [];
                } else {
                    value = value.map(subValue =>
                        this.castFieldValue(field, subValue),
                    );
                }

                if (field.isReference()) {
                    value = _.unique(value);
                }
            } else {
                value = this.castFieldValue(field, value);
            }

            processed[name] = value;
        });

        return processed;
    }

    /**
     * @private
     * todo: replace these if-s with a class implementation
     */
    castFieldValue(field, value) {
        const type = field.getActualType();
        if (type === TYPE_STRING) {
            if (value === undefined || value === null) {
                value = '';
            } else {
                value = value.toString();
            }
        } else if (type === TYPE_BOOLEAN) {
            value = !!value;
        } else if (type === TYPE_INTEGER) {
            value = parseInt(value, 10);
            if (isNaN(value)) {
                value = 0;
            }
        } else if (type === TYPE_DATETIME) {
            if (value === undefined || value === null) {
                return '';
            }

            if (value instanceof Date) {
                value = value.toISOString();
            } else if (isNaN(Date.parse(value))) {
                return '';
            }
        } else if (field.isReference()) {
            if (_.isString(value)) {
                // all good
            } else if (_.isObject(value)) {
                if (ENTITY_CODE_FIELD_NAME in value) {
                    value = value[ENTITY_CODE_FIELD_NAME];
                    if (!_.isne(value)) {
                        value = '';
                    }
                }
            } else {
                value = '';
            }
        } else {
            value = '';
        }

        return value;
    }
}
