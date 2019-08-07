import * as yup from 'yup';
import { BaseField } from './base';
import { DB_VARCHAR_DEF_LENGTH } from '../../constants.server';

export class StringField extends BaseField {
    getLength() {
        const length = parseInt(this.declaration.length, 10);
        if (Number.isNaN(length)) {
            return DB_VARCHAR_DEF_LENGTH;
        }

        return length;
    }

    castValueItem(value) {
        if (value === undefined || value === null) {
            return null;
        }

        return value.toString();
    }

    createValueItemValidator() {
        return yup
            .string()
            .typeError(`Field '${this.getDisplayName()}' is not a string`);
    }
}
