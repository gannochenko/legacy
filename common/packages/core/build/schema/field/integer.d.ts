import * as yup from 'yup';
import { BaseField } from './base';
export declare class IntegerField extends BaseField {
    protected castValueItem(value: any): any;
    protected createValueItemValidator(): yup.NumberSchema<number>;
}
