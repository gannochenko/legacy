import { PatchedConstructor, PatchedPropertyDescriptor } from './type';

export const Endpoint = (endpoint: string): PatchedConstructor => {
    return (constructor: PatchedConstructor) => {
        constructor.mscData = constructor.mscData || { endpoint: '' };
        constructor.mscData.endpoint = endpoint;

        return constructor;
    };
};

export const Get = (endpoint?: string): Function => {
    return (
        target,
        property: string,
        descriptor: PatchedPropertyDescriptor,
    ): PatchedPropertyDescriptor => {
        const { value } = descriptor;
        value.mscData = Object.assign({}, value.mscData, {
            endpoint,
            method: 'get',
        });

        return descriptor;
    };
};

export const Put = (endpoint?: string): Function => {
    return (
        target,
        property: string,
        descriptor: PatchedPropertyDescriptor,
    ): PatchedPropertyDescriptor => {
        const { value } = descriptor;
        value.mscData = Object.assign({}, value.mscData, {
            endpoint,
            method: 'put',
        });

        return descriptor;
    };
};

export const Patch = (endpoint?: string): Function => {
    return (
        target,
        property: string,
        descriptor: PatchedPropertyDescriptor,
    ): PatchedPropertyDescriptor => {
        const { value } = descriptor;
        value.mscData = Object.assign({}, value.mscData, {
            endpoint,
            method: 'patch',
        });

        return descriptor;
    };
};
