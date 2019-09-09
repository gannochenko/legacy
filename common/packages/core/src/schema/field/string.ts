// @ts-ignore
import * as yup from 'yup';
import { BaseField } from './base';
import { DB_VARCHAR_DEF_LENGTH } from '../../constants.server';

export class StringField extends BaseField {
    public getLength() {
        let { length } = this.declaration;
        if (length !== undefined) {
            if (typeof length !== 'number') {
                length = parseInt(length, 10);
                if (Number.isNaN(length)) {
                    return DB_VARCHAR_DEF_LENGTH;
                }
            } else {
                return length;
            }
        }

        return null;
    }

    protected castValueItem(value: any) {
        if (value === undefined || value === null) {
            return null;
        }

        return value.toString();
    }

    protected createValueItemValidator() {
        return yup.string().typeError(this.getTypeErrorMessage('a string'));
    }
}
