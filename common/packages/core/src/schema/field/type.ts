export interface FieldError {
    message?: string;
    code: string;
    fieldName?: string;
}

export interface FieldDeclaration {
    type?: string;
    name?: string;
    label?: string;
    length?: number | string;
    required?: boolean;
    unique?: boolean;
    preview?: boolean;
    system?: boolean;
}

export type Nullable<P> = P | null;
