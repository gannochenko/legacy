import { HTMLAttributes } from 'react';
import { MarginPropsType, StylePropsType } from '@gannochenko/ui.emotion';
import { IGatsbyImageData } from 'gatsby-plugin-image';

export type HeritageObjectListDataItem = {
    slug: string;
    name: string;
    previewPhotoImage?: {
        childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
        };
    };
};

export type HeritageObjectListPropsType = HTMLAttributes<HTMLDivElement> &
    Partial<{
        data: HeritageObjectListDataItem[];
        path: string;
        pageContext: {
            numPages: number;
            currentPage: number;
        };
        foo: any;
    }> &
    MarginPropsType;

export type HeritageObjectDetailRootPropsType = StylePropsType &
    HeritageObjectListPropsType;
