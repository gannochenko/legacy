import * as yup from 'yup';
import { BaseField } from './base';
export declare class ReferenceField extends BaseField {
    getHealth(): Promise<import("../type").SchemaError[]>;
    isReference(): boolean;
    getReferencedEntityName(): string | null;
    protected createValueItemValidator(): yup.StringSchema<string>;
    protected castValueItem(value: any): any;
    castValue(value: any): any;
}
