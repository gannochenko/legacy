import {
    ObjectConditionEnum,
    ObjectKindEnum,
    ObjectMaterialEnum,
} from './enums';
import { heritageStatusMap } from '../../maps/HeritageStatus';
import { heritageLocationAreaMap } from '../../maps/HeritageLocationArea';
import { heritageLevelMap } from '../../maps/HeritageLevel';
import { heritageObjectConditionMap } from '../../maps/conditonMap';

type HeritageObjectPhotoType = {
    variants: {
        normalized: string;
    };
    author?: string;
    source?: string;
    uploadedAt: string;
    capturedAt?: string;
    capturedYearStart?: number;
    capturedYearEnd?: number;
};

export type HeritageObjectType = {
    id: string;
    slug: string;
    name: string;
    nameDe?: string;
    content: string;
    constructionYearStart: number;
    constructionYearEnd: number;
    lossYearStart: number;
    lossYearEnd: number;
    demolished: boolean;
    condition?: keyof typeof heritageObjectConditionMap;
    location: { lat: number; lng: number }[];
    locationDescription?: string;
    locationArea?: keyof typeof heritageLocationAreaMap;
    materials: ObjectMaterialEnum[];
    kind: ObjectKindEnum[];
    createdAt: string;
    updatedAt?: string;
    photos: HeritageObjectPhotoType[];
    heritageStatus?: keyof typeof heritageStatusMap;
    heritageLevel?: keyof typeof heritageLevelMap;
    heritageId?: string;
    lost?: boolean;
    altered?: boolean;
    version: number;
};
