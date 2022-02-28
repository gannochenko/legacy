import { useCallback, useEffect, useState } from 'react';
import { ObjectEditorPropsType } from '../type';
import { eventBus } from '../../../../util/eventBus';
import { EventsEnum } from '../../../../util/events';
import { useEvents } from './useEvents';

export const useObjectEditor = <E extends HTMLDivElement>({
    objectId,
    data,
}: ObjectEditorPropsType) => {
    const [fileUploaderOpen, setFileUploaderOpen] = useState(false);

    const { requestDataRefetch } = useEvents({ setFileUploaderOpen });

    return {
        fileUploaderProps: {
            open: fileUploaderOpen,
            onOpenChange: () => setFileUploaderOpen(false),
            onUploadComplete: () => {
                setFileUploaderOpen(false);
                requestDataRefetch();
            },
            objectId,
        },
    };
};

// const portal =
//     containerRef.current && Editor
//         ? ReactDOM.createPortal(
//             [createElement(Editor, { key: 'editor' })],
//             containerRef.current,
//         )
//         : null;
