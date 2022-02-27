import { HTMLAttributes } from 'react';
import { StylePropsType, MarginPropsType } from '@gannochenko/ui.emotion';

import { ObjectEditorPropsGenericType } from '../type';

export type ObjectEditorButtonsPropsType = HTMLAttributes<HTMLDivElement> &
    Partial<{
        // put your custom props here
    }> &
    ObjectEditorPropsGenericType &
    MarginPropsType;

export type ObjectEditorButtonsRootPropsType = StylePropsType &
    HTMLAttributes<HTMLDivElement>;
