export interface DataDetailPayload {
    field: string;
    data?: object;
    error?: object;
}

export interface DataDetailAction {
    type: string;
    payload: DataDetailPayload;
}
