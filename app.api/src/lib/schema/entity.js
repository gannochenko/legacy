import Field from './field';
import CodeField from './code-field';
import { convertToCamel } from '../util';
import {
    ENTITY_USER_NAME,
    ENTITY_GROUP_NAME,
    ENTITY_CODE_FIELD_NAME,
} from '../../constants';

export default class Entity {
    constructor(declaration) {
        const schema = declaration.schema || [];
        this._schema = {
            name: declaration.name,
            schema: schema.map(field =>
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

    getReferences() {
        return this._schema.schema
            .map(field =>
                _.isne(field.getReferenceFieldName()) ? field : null,
            )
            .filter(x => x);
    }

    toJSON() {
        return this._schema;
    }
}
