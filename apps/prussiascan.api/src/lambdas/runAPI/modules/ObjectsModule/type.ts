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
    yearBuilt?: number;
    periodBuilt?: string;
    yearDemolished?: number;
    periodDemolished?: string;
    demolished?: boolean;
    condition?: ObjectConditionEnum;
    locationLat: number;
    locationLong: number;
    materials?: ObjectMaterialEnum[];
    kind?: ObjectKindEnum[];
};

////////

export type ObjectFieldsType = IdFieldsType & CommonFieldsType;

export type CreateObjectInputType = CommonFieldsType;

export type CreateObjectOutputType = ServiceResponseType<
    IdFieldsType & CommonFieldsType
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
    year?: number;
    period?: string;
};
