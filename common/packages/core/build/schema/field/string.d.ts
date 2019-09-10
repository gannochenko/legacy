import * as yup from 'yup';
import { BaseField } from './base';
export declare class StringField extends BaseField {
    getLength(): number | null;
    protected castValueItem(value: any): any;
    protected createValueItemValidator(): yup.StringSchema<string>;
}
