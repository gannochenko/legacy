import * as yup from 'yup';
import { BaseField } from './base';

export class IntegerField extends BaseField {
    castValue(value) {
        return parseInt(value, 10);
    }

    createValueValidator() {
        return yup
            .number()
            .integer()
            .typeError(`Field '${this.getDisplayName()}' is not an integer`);
    }
}
