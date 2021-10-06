import {
    ObjectConditionEnum,
    ObjectKindEnum,
    ObjectMaterialEnum,
} from './enums';
import { ObjectPhotoEntity } from '../ObjectPhotoEntity';

export class ObjectEntity {
    id: string;
    slug: string;
    name: string;
    content: string;
    yearBuilt: number;
    periodBuilt: string;
    yearDemolished: number;
    periodDemolished: string;
    demolished: boolean;
    condition: ObjectConditionEnum;
    locationLat: number;
    locationLong: number;
    materials: ObjectMaterialEnum[];
    kind: ObjectKindEnum[];
    photos: ObjectPhotoEntity[];
}
