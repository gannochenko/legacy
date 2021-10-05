import { ServiceResponseType } from '../../type';

export type StoreObjectPhotoInputType = {
    objectId: string;
    year?: number;
    period?: string;
};

export type StoreObjectPhotoOutputType = ServiceResponseType<
    Record<string, unknown>
>;
