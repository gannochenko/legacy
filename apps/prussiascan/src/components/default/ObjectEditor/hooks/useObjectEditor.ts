import { useState } from 'react';
import { ObjectEditorPropsType } from '../type';

export const useObjectEditor = <E extends HTMLDivElement>({
    objectId,
    onDataChange,
}: ObjectEditorPropsType) => {
    const [fileUploaderOpen, setFileUploaderOpen] = useState(false);

    return {
        fileUploaderProps: {
            open: fileUploaderOpen,
            onOpenChange: () => setFileUploaderOpen(false),
            onUploadComplete: () => {
                setFileUploaderOpen(false);
                onDataChange?.();
            },
            objectId,
        },
    };
};
