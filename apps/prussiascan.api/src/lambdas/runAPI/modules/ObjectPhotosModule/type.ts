import { ServiceResponseType } from '../../type';

export type StoreObjectPhotoInputType = {
    objectId: string;
    author?: string;
    source?: string;
    capturedAt?: string;
    capturedYearStart?: number;
    capturedYearEnd?: number;
};

export type StoreObjectPhotoOutputType = ServiceResponseType<
    Record<string, unknown>
>;
