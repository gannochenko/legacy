import { ObjectEditorButtonsPropsType } from '../type';
import { AuthState } from '../../../../states';
import { createElement, FC, useCallback, useRef, useState } from 'react';
import { ObjectEditorPropsType } from '../../ObjectEditor/type';

export const useObjectEditorButtons = <E extends HTMLDivElement>({
    objectId,
    ...props
}: ObjectEditorButtonsPropsType) => {
    const { isEditor } = AuthState.useContainer();
    const containerRef = useRef<HTMLDivElement>(null);
    const [Editor, setEditor] = useState<FC<ObjectEditorPropsType> | null>(
        null,
    );

    const onModeToggleButtonClick = useCallback(() => {
        import('../../ObjectEditor').then((data) => {
            setEditor(() => data.ObjectEditor);
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
        hasEditor: Editor !== null,
        editor: Editor
            ? createElement(Editor, { key: 'editor', objectId })
            : null,
    };
};
