import { HTMLAttributes } from 'react';
import {
    StylePropsType,
    MarginPropsType,
} from '@gannochenko/ui.styled-components';

export type BlogListPropsType = HTMLAttributes<HTMLDivElement> &
    Partial<{
        data: Record<string, any>[];
        // put your custom props here
    }> &
    MarginPropsType;

export type BlogListRootPropsType = StylePropsType & BlogListPropsType;
