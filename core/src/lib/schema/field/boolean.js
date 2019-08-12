import * as yup from 'yup';
import { BaseField } from './base';

export class BooleanField extends BaseField {
    castValueItem(value) {
        if (value === undefined || value === null) {
            return null;
        }

        return !!value;
    }

    createValueItemValidator() {
        return yup.boolean().typeError(this.getTypeErrorMessage('a boolean'));
    }
}
