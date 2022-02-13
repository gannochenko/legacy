import ReactDOM from 'react-dom';
import { ObjectEditorButtonsPropsType } from '../type';
import { AuthState } from '../../../../states';
import { createElement, FC, useCallback, useRef, useState } from 'react';

export const useObjectEditorButtons = <E extends HTMLDivElement>({
    ...props
}: ObjectEditorButtonsPropsType) => {
    const { isEditor } = AuthState.useContainer();
    const containerRef = useRef<HTMLDivElement>(null);
    const [editor, setEditor] = useState<FC | null>(null);

    const onModeToggleButtonClick = useCallback(() => {
        import('../../ObjectEditor').then((data) => {
            const Editor = createElement(data.ObjectEditor, { key: 'editor' });
            setEditor(() => Editor);
        });
    }, [containerRef]);

    const portal =
        containerRef.current && editor
            ? ReactDOM.createPortal([editor], containerRef.current)
            : null;

    return {
        rootProps: {
            ...props, // rest props go to the root node, as before
        },
        editModeToggleButtonProps: {
            onClick: onModeToggleButtonClick,
        },
        objectEditorContainerProps: {
            ref: containerRef,
        },
        visible: isEditor,
        portal,
    };
};
