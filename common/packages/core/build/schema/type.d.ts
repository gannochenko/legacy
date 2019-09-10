import {
    BooleanField,
    DateTimeField,
    IdStringField,
    IntegerField,
    ReferenceField,
    StringField,
} from './field';
import { FieldDeclarationUnsafe } from './field/type';
import { Entity } from './entity';
export declare type Field =
    | BooleanField
    | DateTimeField
    | IdStringField
    | IntegerField
    | ReferenceField
    | StringField;
export interface EntityDeclarationUnsafe {
    name?: string;
    schema?: FieldDeclarationUnsafe[];
}
export interface EntityDeclaration {
    name: string;
    schema: Field[];
}
export interface SchemaDeclarationUnsafe {
    version?: number | string;
    schema?: EntityDeclarationUnsafe[];
}
export interface SchemaDeclaration {
    version: number;
    schema: Entity[];
}
export interface ObjectMap<P = any> {
    [key: string]: P;
}
export interface SchemaError {
    message?: string;
    code: string;
    fieldName?: string;
    entityName?: string;
}
export interface ObjectLiteral {
    [key: string]: any;
}
