import {
    ObjectConditionEnum,
    ObjectKindEnum,
    ObjectMaterialEnum,
} from '../../entities/ObjectEntity/enums';
import { ServiceResponseType } from '../../type';

type IdFieldsType = {
    id: string;
    slug: string;
};

type CommonFieldsType = {
    name: string;
    content: string;
    yearBuiltStart?: number;
    yearBuiltEnd?: number;
    yearDemolishedStart?: number;
    yearDemolishedEnd?: number;
    demolished?: boolean;
    condition?: ObjectConditionEnum;
    locationLat: number;
    locationLong: number;
    materials?: ObjectMaterialEnum[];
    kind?: ObjectKindEnum[];
};

type DateFieldsType = {
    createdAt: string;
    updatedAt?: string | null;
};

////////

export type ObjectFieldsType = IdFieldsType & CommonFieldsType;

export type CreateObjectInputType = CommonFieldsType;

export type CreateObjectOutputType = ServiceResponseType<
    IdFieldsType & CommonFieldsType & DateFieldsType
>;

export type FindAllObjectsInputType = {
    limit?: number;
    lastId?: string;
};

export type FindAllObjectsOutputType = ServiceResponseType<
    (IdFieldsType & CommonFieldsType)[],
    { lastId: string | null }
>;

export type GetObjectByIdOutputType =
    ServiceResponseType<ObjectFieldsType | null>;

export type AddObjectPhotoInputType = {
    path: string;
    author?: string;
    source?: string;
    capturedAt?: string;
    capturedYearStart?: number;
    capturedYearEnd?: number;
};

export type AddObjectPhotoOutputType = ServiceResponseType<null>;
