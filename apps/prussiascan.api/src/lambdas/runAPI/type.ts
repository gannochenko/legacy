export type ScalarType = string | number;

export type RESTResponse<D> = {
    data: D;
};

export type AsyncRESTResponse<E> = Promise<RESTResponse<E | null>>;
export type AsyncRESTResponseList<E> = Promise<RESTResponse<E[]>>;
