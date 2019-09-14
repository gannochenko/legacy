export interface FieldDeclarationUnsafe {
    type?: Nullable<string | string[]>;
    name?: Nullable<string>;
    label?: Nullable<string>;
    length?: Nullable<number | string>;
    required?: Nullable<boolean>;
    unique?: Nullable<boolean>;
    preview?: Nullable<boolean>;
    system?: Nullable<boolean>;
}
export interface FieldDeclaration {
    type: string | string[];
    name: string;
    label?: string;
    length?: number | string;
    required?: boolean;
    unique?: boolean;
    preview?: boolean;
    system?: boolean;
}
export declare type Nullable<P> = P | null;
