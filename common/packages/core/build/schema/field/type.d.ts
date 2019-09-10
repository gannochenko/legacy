export interface FieldDeclarationUnsafe {
    type?: string;
    name?: string;
    label?: string;
    length?: number | string;
    required?: boolean;
    unique?: boolean;
    preview?: boolean;
    system?: boolean;
}
export interface FieldDeclaration {
    type: string;
    name: string;
    label?: string;
    length?: number | string;
    required?: boolean;
    unique?: boolean;
    preview?: boolean;
    system?: boolean;
}
export declare type Nullable<P> = P | null;
