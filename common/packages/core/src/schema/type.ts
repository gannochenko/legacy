import {
    BooleanField,
    DateTimeField,
    IdStringField,
    IntegerField,
    ReferenceField,
    StringField,
} from './field';
import { FieldDeclarationUnsafe, Nullable } from './field/type';
import { Entity } from './entity';

export type Field =
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
    message?: Nullable<string>;
    code: string;
    fieldName?: Nullable<string>;
    entityName?: Nullable<string>;
}

export interface ObjectLiteral {
    [key: string]: any;
}
