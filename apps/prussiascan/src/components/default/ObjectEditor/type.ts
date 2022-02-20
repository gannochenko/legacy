import { HTMLAttributes } from 'react';
import { StylePropsType, MarginPropsType } from '@gannochenko/ui.emotion';

export type ObjectEditorPropsType = HTMLAttributes<HTMLDivElement> &
    Partial<{
        // put your custom props here
    }> & {
        objectId: string;
    } & MarginPropsType;

export type ObjectEditorRootPropsType = StylePropsType & ObjectEditorPropsType;
