import * as yup from 'yup';
import { BaseField } from './base';
export declare class BooleanField extends BaseField {
    protected castValueItem(value: any): boolean | null;
    protected createValueItemValidator(): yup.BooleanSchema<boolean>;
}
