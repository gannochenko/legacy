import * as yup from 'yup';
import { BaseField } from './base';
export declare class ReferenceField extends BaseField {
    getHealth(): Promise<import('..').SchemaError[]>;
    isReference(): boolean;
    getReferencedEntityName(): string;
    protected createValueItemValidator(): yup.StringSchema<string>;
    protected castValueItem(value: any): any;
    castValue(value: any): any;
}
