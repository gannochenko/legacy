import { FieldDeclarationUnsafe } from './type';
import { StringField } from './string';
import { BooleanField } from './boolean';
import { IntegerField } from './integer';
import { DateTimeField } from './datetime';
import { ReferenceField } from './reference';
export declare const makeField: (declaration: FieldDeclarationUnsafe) => StringField | IntegerField | BooleanField | DateTimeField | ReferenceField;
