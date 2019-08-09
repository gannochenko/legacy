import * as yup from 'yup';
import { BaseField } from './base';
import _ from '../../lodash';

export class ReferenceField extends BaseField {
    isReference() {
        return true;
    }

    getReferencedEntityName() {
        return this.getActualType();
    }

    isSortable() {
        return false;
    }

    isPreview() {
        return false;
    }

    createValueItemValidator() {
        // todo: it should be uuid actually, so the corresponding check is needed
        return yup.string().typeError(this.getTypeErrorMessage('a string'));
    }

    castValueItem(value) {
        if (value !== undefined && value !== null) {
            return value.toString();
        }

        return null;
    }

    castValue(value) {
        if (this.isMultiple()) {
            if (_.isArray(value)) {
                return _.unique(
                    value.map(subValue => this.castValueItem(subValue)),
                ).filter(x => !!x);
            }

            return [];
        }

        return this.castValueItem(value);
    }
}
