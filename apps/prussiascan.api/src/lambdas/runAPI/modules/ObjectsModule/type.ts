import {
    ObjectConditionEnum,
    ObjectHeritageLevelEnum,
    ObjectHeritageStatusEnum,
    ObjectKindEnum,
    ObjectLocationAreaEnum,
    ObjectMaterialEnum,
} from '../../entities/ObjectEntity/enums';
import { ServiceResponseType } from '../../type';
import { HeritageObjectLocationType } from '../../entities/ObjectEntity/type';

type IdFieldsType = {
    id: string;
    slug: string;
};

export type DynamoDBItemUpdateExpression = {
    UpdateExpression: string;
    ExpressionAttributeValues: Record<string, unknown>;
};

type CommonFieldsType = {
    name: string;
    nameDe: string;
    content: string;
    constructionYearStart?: number;
    constructionYearEnd?: number;
    lossYearStart?: number;
    lossYearEnd?: number;
    lost?: boolean;
    altered?: boolean;
    condition?: ObjectConditionEnum;
    location: HeritageObjectLocationType[];
    locationDescription?: string;
    locationArea?: ObjectLocationAreaEnum;
    materials?: ObjectMaterialEnum[];
    kind?: ObjectKindEnum[];
    heritageId?: string;
    heritageStatus?: ObjectHeritageStatusEnum;
    heritageLevel?: ObjectHeritageLevelEnum;
};

type DateFieldsType = {
    createdAt: string;
    updatedAt?: string | null;
};

////////

export type ObjectFieldsType = IdFieldsType &
    CommonFieldsType &
    Partial<{
        previewPhoto: string;
        headerPhoto: string;
    }>;

export type CreateObjectInputType = CommonFieldsType;

export type CreateObjectOutputType = ServiceResponseType<
    IdFieldsType & CommonFieldsType & DateFieldsType
>;

export type FindAllObjectsInputType = {
    limit?: number;
    lastId?: string;
};

export type FindAllObjectsOutputType = ServiceResponseType<
    ObjectFieldsType[],
    { lastId: string | null }
>;

export type GetObjectByIdOutputType =
    ServiceResponseType<ObjectFieldsType | null>;

export type AddObjectPhotoInputType = {
    variants: Record<string, string>;
    code: string;
    author?: string;
    source?: string;
    capturedAt?: string;
    capturedYearStart?: number;
    capturedYearEnd?: number;
};

export type AddObjectPhotoOutputType = ServiceResponseType<null>;

////////

export enum MimeType {
    jpg = 'jpg',
    png = 'png',
}

export type GetSignedUploadURLInputType = {
    objectId: string;
    fileMime: MimeType;
};

export type AttachFileInputType = {
    objectId: string;
    fileId: string;
    code: string;
    fileMime: MimeType;
    author?: string;
    source?: string;
    capturedAt?: string;
    capturedYearStart?: number;
    capturedYearEnd?: number;
};
