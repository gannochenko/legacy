import { convertToCamel, uCFirst } from '@bucket-of-bolts/util';
import * as yup from 'yup';
import _ from '@bucket-of-bolts/microdash';
import { FIELD_TYPE_STRING } from './field/field-type';
import { ENTITY_ID_FIELD_NAME } from '../constants.both';
import { makeField } from './field/make-field';

export class Entity {
    public constructor(declaration) {
        this.declaration = declaration;
    }

    set declaration(declaration) {
        this.declarationInternal = this.getSanitizedDeclaration(declaration);
    }

    get declaration() {
        return this.declarationInternal;
    }

    getSanitizedDeclaration(declaration) {
        let safeDeclaration = declaration;
        if (!_.isObjectNotEmpty(safeDeclaration)) {
            safeDeclaration = {};
        }
        if (!_.isArrayNotEmpty(safeDeclaration.schema)) {
            safeDeclaration.schema = [];
        }

        return {
            name: safeDeclaration.name || '',
            schema: safeDeclaration.schema.map(field => makeField(field)),
        };
    }

    public async getHealth() {
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
                    message: `Field "${key}" met several times`,
                    code: 'entity_field_duplicate',
                    fieldName: key,
                    entityName: declaration.name || '',
                });
            }
        });

        // check that entity has legal entity id field
        if (!times[ENTITY_ID_FIELD_NAME]) {
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

    /**
     * Returns entity name, in snake_case
     * @returns {*|string.ts}
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
     */
    public getDisplayName() {
        return uCFirst(this.getName()).replace(/_/g, ' ');
    }

    public getFields() {
        return this.declaration.schema;
    }

    public getReferences() {
        return this.getFields().filter(field => field.isReference());
    }

    public getSingleReferences() {
        return this.getFields().filter(
            field => field.isReference() && !field.isMultiple(),
        );
    }

    public getMultipleReferences() {
        return this.getFields().filter(
            field => field.isReference() && field.isMultiple(),
        );
    }

    public getField(name: string) {
        return this.declaration.schema[name];
    }

    public toJSON() {
        return this.declaration;
    }

    public getPreviewField() {
        const preview = this.declaration.schema.find(
            field =>
                field.getType() === FIELD_TYPE_STRING &&
                field.getName() !== ENTITY_ID_FIELD_NAME &&
                field.isPreview(),
        );
        if (preview) {
            return preview;
        }

        return (
            this.declaration.schema.find(
                field =>
                    field.getType() === FIELD_TYPE_STRING &&
                    field.getName() !== ENTITY_ID_FIELD_NAME,
            ) || null
        );
    }

    public getValidator() {
        const shape = {};
        this.declaration.schema.forEach(field => {
            shape[field.getName()] = field.getValidator();
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

        if (!_.isObjectNotEmpty(data)) {
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
        let errors = null;
        try {
            await this.getValidator().validate(sourceData, {
                abortEarly: false,
                // strict: true,
            });
        } catch (validationErrors) {
            if (_.isArray(validationErrors.inner)) {
                errors = validationErrors.inner.map(error => ({
                    message: error.message,
                    fieldName: error.path,
                }));
            } else {
                errors = [
                    {
                        message: 'Internal error',
                        fieldName: '',
                    },
                ];
            }
        }

        return errors;
    }
}
