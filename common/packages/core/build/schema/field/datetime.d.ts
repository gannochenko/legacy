import * as yup from 'yup';
import { BaseField } from './base';
export declare class DateTimeField extends BaseField {
    protected castValueItem(value: any): any;
    protected createValueItemValidator(): yup.DateSchema<Date>;
}
