import * as yup from 'yup';
import { EntityDeclarationUnsafe, EntityDeclaration, Field, SchemaError, ObjectLiteral } from './type';
export declare class Entity {
    protected declarationInternal: EntityDeclaration;
    constructor(declaration?: EntityDeclarationUnsafe);
    declaration: EntityDeclaration;
    protected getSafeDeclaration(declaration?: EntityDeclarationUnsafe): EntityDeclaration;
    getHealth(): Promise<SchemaError[]>;
    getName(): string;
    getCamelName(): string;
    getDisplayName(): string;
    getFields(): Field[];
    getReferences(): Field[];
    getSingleReferences(): Field[];
    getMultipleReferences(): Field[];
    getField(name: string): Field | undefined;
    toJSON(): EntityDeclaration;
    getPreviewField(): import("./field").StringField | import("./field").IntegerField | import("./field").BooleanField | import("./field").DateTimeField | import("./field").ReferenceField | null;
    getValidator(): yup.ObjectSchema<yup.Shape<object, {
        [x: string]: any;
    }>>;
    castData(data: ObjectLiteral): ObjectLiteral;
    validateData(sourceData: any[]): Promise<SchemaError[]>;
}
