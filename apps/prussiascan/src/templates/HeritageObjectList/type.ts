import { HTMLAttributes } from 'react';
import {
    StylePropsType,
    MarginPropsType,
} from '@gannochenko/ui.styled-components';

export type HeritageObjectListPropsType = HTMLAttributes<HTMLDivElement> &
    Partial<{
        data: {
            allHeritageObject: {
                nodes: Record<string, any>[];
            };
        };
        path: string;
        pageContext: {
            numPages: number;
            currentPage: number;
        };
        // put your custom props here
    }> &
    MarginPropsType;

export type HeritageObjectListRootPropsType = StylePropsType &
    HeritageObjectListPropsType;
