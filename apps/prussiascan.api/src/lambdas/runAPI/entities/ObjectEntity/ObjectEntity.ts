import {
    ObjectConditionEnum,
    ObjectKindEnum,
    ObjectMaterialEnum,
} from './enums';
import { ObjectPhotoEntity } from '../ObjectPhotoEntity';

export class ObjectEntity {
    version: number;
    id: string;
    slug: string;
    name: string;
    content: string;
    yearBuiltStart: number;
    yearBuiltEnd: number;
    yearDemolishedStart: number;
    yearDemolishedEnd: number;
    demolished: boolean;
    condition: ObjectConditionEnum;
    locationLat: number;
    locationLong: number;
    materials: ObjectMaterialEnum[];
    kind: ObjectKindEnum[];
    createdAt: string;
    updatedAt?: string;
    photos: ObjectPhotoEntity[];
    oknId?: string;
    coverPhotoURL?: string;
}
