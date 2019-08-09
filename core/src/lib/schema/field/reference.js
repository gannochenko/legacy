import * as yup from 'yup';
import { BaseField } from './base';
import _ from '../../lodash';

export class ReferenceField extends BaseField {
    async getHealth() {
        const errors = await super.getHealth();

        const name = this.getName();
        const unique = this.isUnique();
        const preview = this.isPreview();
        const sortable = this.isSortable();

        if (unique) {
            errors.push({
                message: 'The reference field should not be declared as unique',
                code: 'field_reference_unique_conflict',
                fieldName: name,
            });
        }

        if (preview) {
            errors.push({
                message:
                    'The reference field should not be declared as preview',
                code: 'field_reference_preview_conflict',
                fieldName: name,
            });
        }

        if (sortable) {
            errors.push({
                message:
                    'The reference field should not be declared as sortable',
                code: 'field_reference_sortable_conflict',
                fieldName: name,
            });
        }

        return errors;
    }

    isReference() {
        return true;
    }

    getReferencedEntityName() {
        return this.getActualType();
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
