import {
    ObjectConditionEnum,
    ObjectKindEnum,
    ObjectMaterialEnum,
} from './enums';

type ObjectPhotoEntityType = {
    variants: {
        normalized: string;
    };
    code: string;
    author?: string;
    source?: string;
    uploadedAt: string;
    capturedAt?: string;
    capturedYearStart?: number;
    capturedYearEnd?: number;
};

export type ObjectEntityType = {
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
    photos: ObjectPhotoEntityType[];
    version: number;
};
