import React, { FC } from 'react';

import { ObjectEditorButtonsPropsType } from './type';
import { ObjectEditorButtonsRoot } from './style';
import { useObjectEditorButtons } from './hooks/useObjectEditorButtons';
import { Button } from '@mui/material';

export const ObjectEditorButtons: FC<ObjectEditorButtonsPropsType> = (
    props,
) => {
    const {
        rootProps,
        visible,
        editModeToggleButtonProps,
        objectEditorContainerProps,
        portal,
    } = useObjectEditorButtons(props);

    if (!visible) {
        return null;
    }

    return (
        <ObjectEditorButtonsRoot {...rootProps}>
            <Button {...editModeToggleButtonProps} variant="contained">
                Режим редактирования
            </Button>
            {portal}
            <div key="editor-here" {...objectEditorContainerProps} />
        </ObjectEditorButtonsRoot>
    );
};
