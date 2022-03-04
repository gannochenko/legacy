import { createElement, FC, useCallback, useRef, useState } from 'react';

import { ObjectEditorButtonsPropsType } from '../type';
import { AuthState } from '../../../../states';
import { ObjectEditorPropsType } from '../../ObjectEditor/type';
import { eventBus } from '../../../../util/eventBus';
import { EventsEnum } from '../../../../util/events';

export const useObjectEditorButtons = <E extends HTMLDivElement>({
    objectId,
    data,
    ...props
}: ObjectEditorButtonsPropsType) => {
    const { isEditor } = AuthState.useContainer();
    const containerRef = useRef<HTMLDivElement>(null);
    const [Editor, setEditor] = useState<FC<ObjectEditorPropsType> | null>(
        null,
    );
    const [editorMode, setEditorMode] = useState(false);

    const onModeToggleButtonClick = useCallback(() => {
        import('../../ObjectEditor').then((data) => {
            setEditor(() => data.ObjectEditor);
            setEditorMode((prevMode) => !prevMode);
            setTimeout(() => {
                eventBus.dispatch(EventsEnum.OBJECT_DETAIL_EDIT_MODE_TOGGLE);
            }, 500);
        });
    }, [containerRef]);

    return {
        rootProps: {
            ...props, // rest props go to the root node, as before
        },
        editModeToggleButtonProps: {
            onClick: onModeToggleButtonClick,
        },
        visible: isEditor,
        showEditModeToggleButton: !editorMode,
        hasEditor: Editor !== null,
        editor:
            Editor && objectId && data
                ? createElement(Editor, {
                      key: 'editor',
                      objectId,
                      data,
                  })
                : null,
    };
};
