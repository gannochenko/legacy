import { Entity } from './entity';
import {
    SchemaDeclarationUnsafe,
    SchemaDeclaration,
    SchemaError,
} from './type';
import { ReferenceField } from './field';
export declare class Schema {
    protected declarationInternal: SchemaDeclaration;
    constructor(declaration: SchemaDeclarationUnsafe);
    declaration: SchemaDeclaration;
    getHealth(): Promise<SchemaError[]>;
    getSafeDeclaration(declaration: SchemaDeclarationUnsafe): SchemaDeclaration;
    toJSON(): SchemaDeclaration;
    getSchema(): Entity[];
    getVersion(): number;
    getEntity(name: string): Entity | undefined;
    getReferences(): ReferenceField[];
    isEmpty(): boolean;
}
