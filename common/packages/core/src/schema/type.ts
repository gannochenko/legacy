import {
    BooleanField,
    DateTimeField,
    IdStringField,
    IntegerField,
    ReferenceField,
    StringField,
} from './field';
import { FieldDeclaration } from './field/type';

export type Field =
    | BooleanField
    | DateTimeField
    | IdStringField
    | IntegerField
    | ReferenceField
    | StringField;

export interface EntityDeclarationUnsafe {
    name?: string;
    schema?: FieldDeclaration[];
}

export interface EntityDeclaration {
    name: string;
    schema: Field[];
}
