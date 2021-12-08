import {
    ObjectConditionEnum,
    ObjectKindEnum,
    ObjectMaterialEnum,
    ObjectHeritageStatusEnum,
    ObjectHeritageLevelEnum,
    ObjectLocationAreaEnum,
} from './enums';
import { ObjectPhotoEntity } from '../ObjectPhotoEntity';
import { HeritageObjectLocationType } from './type';

export class ObjectEntity {
    // id
    id: string;
    slug: string;
    name: string;
    nameDe?: string;

    // content
    content: string;

    // historical dates
    constructionYearStart?: number;
    constructionYearEnd?: number;
    lossYearStart?: number;
    lossYearEnd?: number;

    // properties
    materials?: ObjectMaterialEnum[];
    kind?: ObjectKindEnum[];

    // status
    condition?: ObjectConditionEnum;
    lost?: boolean;
    altered?: boolean;
    remarkable?: boolean;

    // location
    location: HeritageObjectLocationType[];
    locationDescription?: string;
    locationArea?: ObjectLocationAreaEnum;

    // heritage
    heritageId?: string;
    heritageStatus?: ObjectHeritageStatusEnum;
    heritageLevel?: ObjectHeritageLevelEnum;

    // photos
    photos: ObjectPhotoEntity[];

    // aux
    createdAt: string;
    updatedAt?: string;
    version: number;

    architects?: string[];
}
