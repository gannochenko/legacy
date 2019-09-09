// @ts-ignore
import * as yup from 'yup';
import _ from '@bucket-of-bolts/microdash';
import { BaseField } from './base';

export class ReferenceField extends BaseField {
    public async getHealth() {
        const errors = await super.getHealth();

        const name = this.getName();
        const unique = this.isUnique();
        const preview = this.isPreview();

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

        return errors;
    }

    public isReference() {
        return true;
    }

    public getReferencedEntityName() {
        return this.getActualType();
    }

    protected createValueItemValidator() {
        // todo: it should be uuid actually, so the corresponding check is needed
        return yup.string().typeError(this.getTypeErrorMessage('a string'));
    }

    protected castValueItem(value: any) {
        if (value !== undefined && value !== null) {
            return value.toString();
        }

        return null;
    }

    public castValue(value: any) {
        if (this.isMultiple()) {
            if (_.isArray(value)) {
                return _.unique(
                    value.map(subValue => this.castValueItem(subValue)),
                ).filter((x: any) => !!x);
            }

            return [];
        }

        return this.castValueItem(value);
    }
}
