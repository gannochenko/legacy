import { HTMLAttributes } from 'react';
import {
    StylePropsType,
    MarginPropsType,
} from '@gannochenko/ui.styled-components';

export type HeritageObjectListPropsType = HTMLAttributes<HTMLDivElement> &
    Partial<{
        data: Record<string, any>[];
        // put your custom props here
    }> &
    MarginPropsType;

export type HeritageObjectListRootPropsType = StylePropsType & HeritageObjectListPropsType;
