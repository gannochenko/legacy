import * as yup from 'yup';
import { StringField } from './string';
import {
    ENTITY_ID_FIELD_NAME,
    ENTITY_ID_FIELD_LENGTH,
} from '../../constants.both';
import { FIELD_TYPE_STRING } from './type';

export class IdStringField extends StringField {
    /**
     * In this function we assume that the name of the field is equal to ENTITY_ID_FIELD_NAME constant value
     * @returns {Promise<Array>}
     */
    async getHealth() {
        const errors = await super.getHealth();

        const name = this.getName();
        const system = this.isSystem();
        const unique = this.isUnique();
        const length = this.getLength();

        if (!system) {
            errors.push({
                message: `The field should be declared as system-reserved: ${name}`,
                code: `field_not_system`,
                fieldName: name,
            });
        }

        // check that it is unique
        if (!unique) {
            errors.push({
                message: `System field "${ENTITY_ID_FIELD_NAME}" should be unique`,
                code: 'field_id_not_unique',
                fieldName: name,
            });
        }

        // check that it has type of string
        if (this.getActualType() !== FIELD_TYPE_STRING) {
            errors.push({
                message: `System field "${ENTITY_ID_FIELD_NAME}" should be string`,
                code: 'field_id_not_string',
                fieldName: name,
            });
        }

        // check that it is not multiple
        if (this.isMultiple()) {
            errors.push({
                message: `System field "${ENTITY_ID_FIELD_NAME}" should not be multiple`,
                code: 'field_id_multiple',
                fieldName: name,
            });
        }

        // check that it has length
        const len = parseInt(length, 10);
        if (Number.isNaN(len) || len !== ENTITY_ID_FIELD_LENGTH) {
            errors.push({
                message: `System field "${ENTITY_ID_FIELD_NAME}" should have length of ${ENTITY_ID_FIELD_LENGTH}`,
                code: 'field_id_illegal_length',
                fieldName: name,
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
            .typeError(this.getTypeErrorMessage('a string'));
    }
}
