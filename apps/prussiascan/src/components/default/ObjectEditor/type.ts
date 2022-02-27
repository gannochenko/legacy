import { HTMLAttributes } from 'react';
import { StylePropsType, MarginPropsType } from '@gannochenko/ui.emotion';
import { ObjectEditorPropsGenericType } from '../type';

export type ObjectEditorPropsType = HTMLAttributes<HTMLDivElement> &
    Partial<{
        // put your custom props here
    }> &
    ObjectEditorPropsGenericType &
    MarginPropsType;

export type ObjectEditorRootPropsType = StylePropsType & ObjectEditorPropsType;
