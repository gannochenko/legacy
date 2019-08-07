/* eslint import/no-unresolved: 0 */

import { uCFirst, convertToCamel } from 'ew-internals';
import * as yup from 'yup';
import { FIELD_TYPE_STRING } from './field/type';
import { ENTITY_ID_FIELD_NAME } from '../constants.both';
import _ from '../lodash';
import { makeField } from './field/make-field';

export class Entity {
    constructor(declaration) {
        this.declaration = declaration;
    }

    async getHealth() {
        const errors = [];
        const { declaration } = this;

        // check that entity has a name
        if (!declaration.name.length) {
            errors.push({
                message: 'Entity does not have a name',
                code: 'entity_name_empty',
                entityName: '',
            });
        }

        // check schema
        if (!declaration.schema.length) {
            errors.push({
                message: 'Entity does not have a single field',
                code: 'entity_schema_empty',
                entityName: declaration.name || '',
            });

            return errors; // no point on further checking
        }

        const times = {};
        declaration.schema.forEach(field => {
            times[field.getName()] =
                field.getName() in times ? times[field.getName()] + 1 : 1;
        });

        Object.keys(times).forEach(key => {
            if (times[key] > 1) {
                errors.push({
                    message: `Field "${times[key]}" met several times`,
                    code: 'entity_field_duplicate',
                    fieldName: times[key],
                    entityName: declaration.name || '',
                });
            }
        });

        // check that entity has legal entity id field
        if (!times[ENTITY_ID_FIELD_NAME]) {
            errors.push({
                message: `Entity does not have mandatory id field`,
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

    set declaration(declaration) {
        this.declarationInternal = this.getSanitizedDeclaration(declaration);
    }

    get declaration() {
        return this.declarationInternal;
    }

    getSanitizedDeclaration(declaration) {
        let safeDeclaration = declaration;
        if (!_.ione(safeDeclaration)) {
            safeDeclaration = {};
        }
        if (!_.iane(safeDeclaration.schema)) {
            safeDeclaration.schema = [];
        }

        return {
            name: safeDeclaration.name || '',
            schema: safeDeclaration.schema.map(field => makeField(field)),
        };
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
                    field.getType() === FIELD_TYPE_STRING &&
                    field.getName() !== ENTITY_ID_FIELD_NAME,
            ) || null
        );
    }

    getValidator() {
        const shape = {};
        this.declaration.schema.forEach(field => {
            let rule = field.createValueItemValidator();

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

            if (!(name in data)) {
                return;
            }

            processed[name] = field.castValue(data[name]);
        });

        return processed;
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
}
