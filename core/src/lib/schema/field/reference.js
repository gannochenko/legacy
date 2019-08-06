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
}
