import { HTMLAttributes } from 'react';
import {
    StylePropsType,
    ObjectLiteralType,
    MarginPropsType,
} from '@gannochenko/ui.styled-components';

export type CategoriesPropsType = HTMLAttributes<HTMLDivElement> &
    Partial<{
        // put your custom props here
        location: { pathname: string };
    }> &
    MarginPropsType &
    ObjectLiteralType;

export type CategoriesRootPropsType = StylePropsType & CategoriesPropsType;
