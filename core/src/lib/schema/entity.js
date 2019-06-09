/* eslint import/no-unresolved: 0 */

import { uCFirst, convertToCamel } from 'ew-internals';
import * as yup from 'yup';
import { Field } from './field';
import {
    TYPE_STRING,
    TYPE_INTEGER,
    TYPE_DATETIME,
    TYPE_BOOLEAN,
} from '../field-types';
import { CodeField } from './code-field';
import {
    ENTITY_USER_NAME,
    ENTITY_GROUP_NAME,
    ENTITY_CODE_FIELD_NAME,
} from '../entity-types';
import _ from '../lodash';

export class Entity {
    constructor(declaration) {
        let safeDeclaration = declaration;
        if (!_.ione(safeDeclaration)) {
            safeDeclaration = {};
        }
        if (!_.iane(safeDeclaration.schema)) {
            safeDeclaration.schema = [];
        }

        this.declaration = {
            name: safeDeclaration.name || '',
            schema: safeDeclaration.schema.map(field =>
                field.name === ENTITY_CODE_FIELD_NAME
                    ? new CodeField(field)
                    : new Field(field),
            ),
        };
    }

    async checkHealth() {
        const errors = [];
        const { declaration } = this;

        // check that entity has a name
        if (!_.isne(declaration.name)) {
            errors.push({
                message: 'Entity does not have a name',
                code: 'entity_name_empty',
                entityName: '',
            });
        }

        // check that entity does not have a reserved name
        if (
            _.isne(declaration.name) &&
            (declaration.name === ENTITY_USER_NAME ||
                declaration.name === ENTITY_GROUP_NAME)
        ) {
            errors.push({
                message: 'Entity name is a reserved name',
                code: 'entity_name_reserved',
                entityName: declaration.name,
            });
        }

        // check schema

        if (!_.iane(declaration.schema)) {
            errors.push({
                message: 'Entity does not have a single field',
                code: 'entity_schema_empty',
                entityName: declaration.name,
            });
        }

        const times = {};
        declaration.schema.forEach(field => {
            times[field.getName()] =
                field.getName() in times ? times[field.getName()] + 1 : 1;
        });

        if (!(ENTITY_CODE_FIELD_NAME in times)) {
            errors.push({
                message: `System field "code" is missing`,
                code: 'entity_code_field_missing',
                entityName: declaration.name,
            });
        }

        Object.keys(times).forEach(key => {
            if (times[key] > 1) {
                errors.push({
                    message: `Field "${times[key]}" met several times`,
                    code: 'entity_field_duplicate',
                    fieldName: times[key],
                    entityName: declaration.name,
                });
            }
        });

        await Promise.all(
            declaration.schema.map(field =>
                field.checkHealth().then(fieldErrors => {
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

    /**
     * Returns entity name, in snake_case
     * @returns {*|string}
     */
    getName() {
        return this.declaration.name;
    }

    /**
     * Returns entity name in CamelCase
     * @returns {*}
     */
    getCamelName() {
        return convertToCamel(this.getName().toLowerCase());
    }

    /**
     * Returns entity name in Readable format with spaces
     * @returns {*}
     */
    getDisplayName() {
        return uCFirst(this.getName()).replace(/_/g, ' ');
    }

    getReferences() {
        return this.declaration.schema
            .map(field =>
                _.isne(field.getReferenceFieldName()) ? field : null,
            )
            .filter(x => x);
    }

    getFields() {
        return this.declaration.schema;
    }

    toJSON() {
        return this.declaration;
    }

    // aux
    getPresentationField() {
        return (
            this.declaration.schema.find(
                field =>
                    field.getType() === TYPE_STRING &&
                    field.getName() !== ENTITY_CODE_FIELD_NAME,
            ) || null
        );
    }

    getValidator() {
        const shape = {};
        this.declaration.schema.forEach(field => {
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
        let safeValue = value;
        if (type === TYPE_STRING) {
            if (safeValue === undefined || safeValue === null) {
                safeValue = '';
            } else {
                safeValue = safeValue.toString();
            }
        } else if (type === TYPE_BOOLEAN) {
            safeValue = !!safeValue;
        } else if (type === TYPE_INTEGER) {
            safeValue = parseInt(safeValue, 10);
            if (Number.isNaN(safeValue)) {
                safeValue = 0;
            }
        } else if (type === TYPE_DATETIME) {
            if (safeValue === undefined || safeValue === null) {
                return '';
            }

            if (safeValue instanceof Date) {
                safeValue = safeValue.toISOString();
            } else if (Number.isNaN(Date.parse(safeValue))) {
                return '';
            }
        } else if (field.isReference()) {
            if (_.isString(safeValue)) {
                // all good
            } else if (_.isObject(safeValue)) {
                if (ENTITY_CODE_FIELD_NAME in safeValue) {
                    safeValue = safeValue[ENTITY_CODE_FIELD_NAME];
                    if (!_.isne(safeValue)) {
                        safeValue = '';
                    }
                }
            } else {
                safeValue = '';
            }
        } else {
            safeValue = '';
        }

        return safeValue;
    }
}
