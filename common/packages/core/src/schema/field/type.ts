export const FIELD_TYPE_STRING = 'string';
export const FIELD_TYPE_INTEGER = 'integer';
export const FIELD_TYPE_BOOLEAN = 'boolean';
export const FIELD_TYPE_DATETIME = 'datetime';

export interface FieldError {
    message?: string;
    code: string;
    fieldName?: string;
}

export interface FieldDeclaration {
    type?: string;
    name?: string;
    label?: string;
    length?: number;
    required?: boolean;
    unique?: boolean;
    preview?: boolean;
    system?: boolean;
}

export type Nullable<P> = P | null;
