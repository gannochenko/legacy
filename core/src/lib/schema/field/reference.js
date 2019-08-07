import * as yup from 'yup';
import { BaseField } from './base';

export class ReferenceField extends BaseField {
    castValue(value) {
        if (value !== undefined && value !== null) {
            return value.toString();
        }

        return null;
    }

    isReference() {
        return true;
    }

    getReferencedEntityName() {
        return this.getActualType();
    }

    isSortable() {
        return false;
    }

    createValueValidator() {
        // todo: it should be uuid actually, so the corresponding check is needed
        return yup
            .string()
            .typeError(
                `Reference field '${this.getDisplayName()}' is not a string`,
            );
    }
}
