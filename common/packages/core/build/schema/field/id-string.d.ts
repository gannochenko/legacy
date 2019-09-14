import * as yup from 'yup';
import { StringField } from './string';
export declare class IdStringField extends StringField {
    getHealth(): Promise<import('..').SchemaError[]>;
    protected createValueItemValidator(): yup.StringSchema<string>;
}
