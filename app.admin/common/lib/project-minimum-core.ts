export interface EntityItemData {
    code: string;
}

export interface Entity {
    getName: () => string;
    getDisplayName: () => string;
}

export interface Schema {
    getEntity: (entityName: string) => Nullable<Entity>;
}
