import { HTMLAttributes } from 'react';
import {
    StylePropsType,
    ObjectLiteralType,
    MarginPropsType,
} from '@gannochenko/ui.styled-components';

export type ReasonsPropsType = HTMLAttributes<HTMLDivElement> &
    Partial<{
        resettlement: boolean;
        sold: boolean;
        text: string;
        // put your custom props here
    }> &
    MarginPropsType &
    ObjectLiteralType;

export type ReasonsRootPropsType = StylePropsType & ReasonsPropsType;
