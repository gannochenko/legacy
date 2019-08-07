import * as yup from 'yup';
import { BaseField } from './base';

export class BooleanField extends BaseField {
    castValue(value) {
        return !!value;
    }

    createValueValidator() {
        return yup
            .boolean()
            .typeError(`Field '${this.getDisplayName()}' is not a boolean`);
    }
}
