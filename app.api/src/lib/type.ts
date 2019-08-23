export interface ResultError {
    message?: string;
    code: string;
    type?: string;
}

export interface Result {
    data?: any;
    errors: ResultError[];
    status?: number;
}
