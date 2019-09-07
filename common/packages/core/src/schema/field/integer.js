import * as yup from 'yup';
import { BaseField } from './base';

export class IntegerField extends BaseField {
    castValueItem(value) {
        if (value === undefined || value === null) {
            return null;
        }

        const castedValue = parseInt(value, 10);
        if (!Number.isNaN(castedValue)) {
            return castedValue;
        }

        return value; // unable to cast
    }

    createValueItemValidator() {
        return yup
            .number()
            .integer()
            .typeError(this.getTypeErrorMessage('an integer'));
    }
}
