import * as yup from 'yup';
import { BaseField } from './base';

export class IntegerField extends BaseField {
    castValueItem(value) {
        return parseInt(value, 10);
    }

    createValueItemValidator() {
        return yup
            .number()
            .integer()
            .typeError(`Field '${this.getDisplayName()}' is not an integer`);
    }
}
