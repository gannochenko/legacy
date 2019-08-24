export interface Item {
    id: string;
}

export interface Entity {
    getName: () => string;
    getDisplayName: () => string;
    getCamelName(): string;
    getFields: () => Field[];
    castData(data: StringMap): StringMap;
    validateData(data: StringMap): FieldError[];
    getSingleReferences(): Field[];
    getMultipleReferences(): Field[];
    getReferences(): Field[];
}

export interface Schema {
    getEntity: (entityName: string) => Nullable<Entity>;
    getSchema(): Entity[];
}

export interface Field {
    getName: () => string;
    getDisplayName: () => string;
    isSortable: () => boolean;
    isReference: () => boolean;
    isRequired(): boolean;
    getActualType: () => string;
    isMultiple: () => boolean;
    getReferencedEntityName(): string;
}

export interface FieldError {
    message?: string;
    fieldName?: string;
}
