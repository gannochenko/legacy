import {
    ObjectConditionEnum,
    ObjectKindEnum,
    ObjectMaterialEnum,
} from './enums';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { heritageStatusMap } from '../../maps/HeritageStatus';

type HeritageObjectPhotoType = {
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

export type HeritageObjectType = {
    id: string;
    slug: string;
    name: string;
    nameDe?: string;
    content: string;
    yearBuiltStart: number;
    yearBuiltEnd: number;
    yearDemolishedStart: number;
    yearDemolishedEnd: number;
    demolished: boolean;
    condition: ObjectConditionEnum;
    location: { lat: number; lng: number }[];
    locationDescription?: string;
    materials: ObjectMaterialEnum[];
    kind: ObjectKindEnum[];
    createdAt: string;
    updatedAt?: string;
    photos: HeritageObjectPhotoType[];
    previewPhoto?: string;
    previewPhotoImg?: {
        childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
        };
    };
    headerPhoto?: string;
    headerPhotoImg?: {
        childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
        };
    };
    heritageStatus?: keyof typeof heritageStatusMap;

    version: number;
};