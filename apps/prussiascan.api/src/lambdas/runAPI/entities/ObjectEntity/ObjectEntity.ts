import {
    ObjectConditionEnum,
    ObjectKindEnum,
    ObjectMaterialEnum,
} from './enums';

export class ObjectEntity {
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
}
