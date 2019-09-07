import * as yup from 'yup';
import { BaseField } from './base';

export class BooleanField extends BaseField {
    protected castValueItem(value: any) {
        if (value === undefined || value === null) {
            return null;
        }

        return !!value;
    }

    protected createValueItemValidator() {
        return yup.boolean().typeError(this.getTypeErrorMessage('a boolean'));
    }
}
