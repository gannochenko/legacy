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
        return this.declaration.schema.filter(field => field.isReference());
    }

    getFields() {
        return this.declaration.schema;
    }

    getField(name) {
        return this.declaration.schema[name];
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
                rule = yup
                    .string()
                    .typeError(
                        `Reference field '${field.getDisplayName()}' is not a string`,
                    );
            } else {
                const type = field.getActualType();
                if (type === TYPE_INTEGER) {
                    rule = yup
                        .number()
                        .integer()
                        .typeError(
                            `Field '${field.getDisplayName()}' is not a number`,
                        );
                } else if (type === TYPE_BOOLEAN) {
                    rule = yup
                        .boolean()
                        .typeError(
                            `Field '${field.getDisplayName()}' is not a boolean`,
                        );
                } else if (type === TYPE_DATETIME) {
                    rule = yup
                        .date()
                        .typeError(
                            `Field '${field.getDisplayName()}' is not a date`,
                        );
                } else {
                    rule = yup
                        .string()
                        .typeError(
                            `Field '${field.getDisplayName()}' is not a string`,
                        );
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

    /**
     * Before saving any data tries to cast every value that is possible to cast,
     * to make the API more tolerant and friendly
     * @param data
     * todo: better to name it "castData"
     */
    castData(data) {
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
                // if (!_.isArray(value)) {
                //     value = [this.castFieldValue(field, value)];
                // } else {
                //     value = value.map(subValue =>
                //         this.castFieldValue(field, subValue),
                //     );
                // }

                if (_.isArray(value)) {
                    value = value.map(subValue =>
                        this.castFieldValue(field, subValue),
                    );

                    // remove all nulls, does not make sense to keep them
                    value = value.filter(x => x !== null);
                }

                if (field.isReference()) {
                    value = _.unique(value).filter(x => !!x);
                }
            } else {
                value = this.castFieldValue(field, value);
            }

            processed[name] = value;
        });

        return processed;
    }

    /**
     * @deprecated
     * @param data
     * @returns {{}}
     */
    prepareData(data) {
        return this.castData(data);
    }

    async validateData(sourceData) {
        let data = null;
        let errors = null;
        try {
            data = await this.getValidator().validate(sourceData, {
                abortEarly: false,
            });
        } catch (validationErrors) {
            errors = validationErrors.inner.map(error => ({
                message: error.message,
                field: error.path,
            }));
        }

        return { data, errors };
    }

    castFieldValue(field, value) {
        const type = field.getActualType();
        let safeValue = value;

        if (type === TYPE_STRING) {
            if (safeValue === undefined || safeValue === null) {
                safeValue = null;
            } else {
                safeValue = safeValue.toString();
            }
        } else if (type === TYPE_BOOLEAN) {
            safeValue = !!safeValue;
        } else if (type === TYPE_INTEGER) {
            safeValue = parseInt(safeValue, 10);
        } else if (type === TYPE_DATETIME) {
            if (safeValue === undefined || safeValue === null) {
                return null;
            }

            if (safeValue instanceof Date) {
                // just a date
                safeValue = safeValue.toISOString();
            } else {
                const timestamp = Date.parse(safeValue);
                if (!Number.isNaN(timestamp)) {
                    // a string representation of a date
                    safeValue = new Date(timestamp).toISOString();
                } else if (!Number.isNaN(parseInt(safeValue, 10))) {
                    // last chance - a timestamp
                    safeValue = new Date(parseInt(safeValue, 10)).toISOString();
                }
            }
        } else if (field.isReference()) {
            if (safeValue !== undefined && safeValue !== null) {
                safeValue = safeValue.toString();
            } else {
                safeValue = null;
            }
        }

        return safeValue;
    }
}
