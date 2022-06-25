type ServiceResponseErrorType = {
    code: string;
    message?: string;
};

export type ServiceResponseType<D extends {} = {}> = {
    id?: string;
    data: D;
    errors?: ServiceResponseErrorType[];
};
