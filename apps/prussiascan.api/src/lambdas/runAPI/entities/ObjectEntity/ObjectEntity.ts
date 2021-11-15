import {
    ObjectConditionEnum,
    ObjectKindEnum,
    ObjectMaterialEnum,
    ObjectHeritageStatusEnum,
    ObjectHeritageLevelEnum,
    ObjectLocationAreaEnum,
} from './enums';
import { ObjectPhotoEntity } from '../ObjectPhotoEntity';

export class ObjectEntity {
    // id
    id: string;
    slug: string;
    name: string;
    nameDe: string;

    // content
    content: string;

    // historical dates
    constructionYearStart: number;
    constructionYearEnd: number;
    lossYearStart: number;
    lossYearEnd: number;

    // properties
    materials: ObjectMaterialEnum[];
    kind: ObjectKindEnum[];

    // status
    condition: ObjectConditionEnum;
    lost: boolean;
    altered: boolean;

    // location
    location: [number, number][];
    locationDescription?: string;
    locationArea?: ObjectLocationAreaEnum;

    // heritage
    heritageId?: string;
    heritageStatus?: ObjectHeritageStatusEnum;
    heritageLevel?: ObjectHeritageLevelEnum;

    // photos
    photos: ObjectPhotoEntity[];
    previewPhoto?: string; // system

    // aux
    createdAt: string;
    updatedAt?: string;
    version: number;
}
