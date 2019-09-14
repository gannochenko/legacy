import * as yup from 'yup';
import { FieldDeclaration, FieldDeclarationUnsafe, Nullable } from './type';
import { SchemaError } from '../type';
export declare class BaseField {
    protected declarationInternal: FieldDeclaration;
    protected fieldValidator: Nullable<
        yup.ObjectSchema<FieldDeclarationUnsafe>
    >;
    constructor(declaration?: FieldDeclarationUnsafe);
    declaration: FieldDeclaration;
    getType(): string | string[];
    getHealth(): Promise<SchemaError[]>;
    getActualType(): string;
    getLength(): number | null;
    getName(): string;
    getDisplayName(): string;
    getDeclaration(): FieldDeclaration;
    isMultiple(): boolean;
    isSortable(): boolean;
    isRequired(): boolean;
    isPreview(): boolean;
    isUnique(): boolean;
    isSystem(): boolean;
    toJSON(): FieldDeclaration;
    castValue(value: any): any;
    getReferencedEntityName(): string;
    isReference(): boolean;
    protected getSafeDeclaration(
        declaration?: FieldDeclarationUnsafe,
    ): FieldDeclaration;
    protected getDeclarationValidator(): yup.ObjectSchema<
        FieldDeclarationUnsafe
    >;
    protected castValueItem(value: any): any;
    getValidator(): yup.MixedSchema<unknown>;
    protected createValueItemValidator(): yup.MixedSchema<unknown>;
    protected getTypeErrorMessage(what: string): string;
}
