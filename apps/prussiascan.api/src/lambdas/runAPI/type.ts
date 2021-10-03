export type ScalarType = string | number;

export type RESTResponse<D> = {
    data: D;
    aux: unknown;
};

export type AsyncRESTResponse<E> = Promise<RESTResponse<E | null>>;
export type AsyncRESTResponseList<E> = Promise<RESTResponse<E[]>>;

export type ServiceResponseType<D, A = Record<string, unknown>> = {
    data: D;
    aux: A;
};
