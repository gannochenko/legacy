import * as yup from 'yup';
import { StringField } from './string';
import {
    ENTITY_ID_FIELD_NAME,
    ENTITY_ID_FIELD_LENGTH,
} from '../../constants.both';
import { FIELD_TYPE_STRING } from './type';

export class IdStringField extends StringField {
    async getHealth() {
        const errors = await super.getHealth();

        const { declaration } = this;

        // check that it is unique
        if (!declaration.unique) {
            errors.push({
                message: `System field "${ENTITY_ID_FIELD_NAME}" should be unique`,
                code: 'field_id_not_unique',
                fieldName: declaration.name,
            });
        }

        // check that it has type of string
        if (this.getActualType() !== FIELD_TYPE_STRING) {
            errors.push({
                message: `System field "${ENTITY_ID_FIELD_NAME}" should be string`,
                code: 'field_id_not_string',
                fieldName: declaration.name,
            });
        }

        // check that it is not multiple
        if (this.isMultiple()) {
            errors.push({
                message: `System field "${ENTITY_ID_FIELD_NAME}" should not be multiple`,
                code: 'field_id_multiple',
                fieldName: declaration.name,
            });
        }

        // check that it has length
        const len = parseInt(declaration.length, 10);
        if (Number.isNaN(len) || len !== ENTITY_ID_FIELD_LENGTH) {
            errors.push({
                message: `System field "${ENTITY_ID_FIELD_NAME}" should have length of ${ENTITY_ID_FIELD_LENGTH}`,
                code: 'field_id_illegal_length',
                fieldName: declaration.name,
            });
        }

        // check that it is system
        if (!this.isSystem()) {
            errors.push({
                message: `System field "${ENTITY_ID_FIELD_NAME}" should not declared as system`,
                code: 'field_id_system',
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
                ENTITY_ID_FIELD_LENGTH,
                `Field '${this.getDisplayName()}' should be ${ENTITY_ID_FIELD_LENGTH} characters long`,
            )
            .typeError(`Field '${this.getDisplayName()}' is not a string`);
    }
}
