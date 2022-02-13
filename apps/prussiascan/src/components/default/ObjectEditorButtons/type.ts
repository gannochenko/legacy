import { HTMLAttributes } from 'react';
import { StylePropsType, MarginPropsType } from '@gannochenko/ui.emotion';

export type ObjectEditorButtonsPropsType = HTMLAttributes<HTMLDivElement> &
    Partial<{
        // put your custom props here
    }> &
    MarginPropsType;

export type ObjectEditorButtonsRootPropsType = StylePropsType & ObjectEditorButtonsPropsType;
