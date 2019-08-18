/** @deprecated */
export interface EntityItemData {
    code: string;
}

export interface Item {
    id: string;
}

export interface Entity {
    getName: () => string;
    getDisplayName: () => string;

    getFields: () => Field[];
}

export interface Schema {
    getEntity: (entityName: string) => Nullable<Entity>;
}

export interface Field {
    getName: () => string;
    getDisplayName: () => string;
    isSortable: () => boolean;
    isReference: () => boolean;
    getActualType: () => string;
    isMultiple: () => boolean;
}
