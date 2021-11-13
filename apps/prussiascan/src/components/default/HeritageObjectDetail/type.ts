import { HTMLAttributes } from 'react';
import {
    StylePropsType,
    MarginPropsType,
} from '@gannochenko/ui.styled-components';
import { HeritageObjectType } from '../../../services/HeritageObject/type';

export type HeritageObjectDetailPropsType = HTMLAttributes<HTMLDivElement> &
    Partial<{
        data: HeritageObjectType;
        // put your custom props here
    }> &
    MarginPropsType;

export type HeritageObjectDetailRootPropsType = StylePropsType &
    HeritageObjectDetailPropsType;
