import * as yup from 'yup';
import { StringField } from './string';
import { ENTITY_ID_FIELD_NAME } from '../../constants.both';
import { FIELD_TYPE_STRING } from './type';

export class IdStringField extends StringField {
    async getHealth() {
        const errors = await super.getHealth();

        const { declaration } = this;

        // // check that it is mandatory
        // if (!declaration.required) {
        //     errors.push({
        //         message: `System field "code" should be mandatory`,
        //         code: 'field_code_not_mandatory',
        //         fieldName: declaration.name,
        //     });
        // }

        // check that it is unique
        if (!declaration.unique) {
            errors.push({
                message: `System field "${ENTITY_ID_FIELD_NAME}" should be unique`,
                code: 'field_code_not_unique',
                fieldName: declaration.name,
            });
        }

        // check that it has type of string
        if (this.getActualType() !== FIELD_TYPE_STRING) {
            errors.push({
                message: `System field "${ENTITY_ID_FIELD_NAME}" should be string`,
                code: 'field_code_not_string',
                fieldName: declaration.name,
            });
        }

        // check that it is not multiple
        if (this.isMultiple()) {
            errors.push({
                message: `System field "${ENTITY_ID_FIELD_NAME}" should not be multiple`,
                code: 'field_code_multiple',
                fieldName: declaration.name,
            });
        }

        // check that it is not multiple
        const len = parseInt(declaration.length, 10);
        if (Number.isNaN(len) || len <= 0) {
            errors.push({
                message: `System field "${ENTITY_ID_FIELD_NAME}" should have finite length`,
                code: 'field_code_illegal_length',
                fieldName: declaration.name,
            });
        }

        return errors;
    }

    createValueItemValidator() {
        // todo: check for uuid
        return yup
            .string()
            .length(
                32,
                `Field '${this.getDisplayName()}' should be 32 characters long`,
            )
            .typeError(`Field '${this.getDisplayName()}' is not a string`);
    }
}
