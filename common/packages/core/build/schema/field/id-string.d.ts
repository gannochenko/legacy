import * as yup from 'yup';
import { StringField } from './string';
export declare class IdStringField extends StringField {
    getHealth(): Promise<import("../type").SchemaError[]>;
    protected createValueItemValidator(): yup.StringSchema<string>;
}
