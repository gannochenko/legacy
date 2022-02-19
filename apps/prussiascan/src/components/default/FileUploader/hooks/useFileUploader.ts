import { FileUploaderPropsType, SelectedFileType } from '../type';
import { Breakpoint } from '@mui/system';
import { useCallback, useRef, useState } from 'react';
import { convertFileToBase64 } from '../util/convertFileToBase64';

export const useFileUploader = <E extends HTMLDivElement>({
    open,
    ...props
}: FileUploaderPropsType) => {
    const [selectedFiles, setSelectedFiles] = useState<SelectedFileType[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const onFileInputChange = useCallback((event) => {
        const target = event.target as HTMLInputElement;
        const files = target.files;
        if (files) {
            (async () => {
                const previews = await Promise.all(
                    Array.from(files).map((file) => convertFileToBase64(file)),
                );

                setSelectedFiles((prevState) => [...prevState, ...previews]);
            })();
        }
    }, []);
    const onFileSelectorClick = useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, [fileInputRef.current]);

    const onStartButtonProps = useCallback(() => {}, []);

    return {
        rootProps: {
            ...props, // rest props go to the root node, as before
        },
        dialogProps: {
            open: !!open,
            onClose: () => {},
            maxWidth: 'lg' as Breakpoint,
        },
        fileInputProps: {
            hidden: true,
            onChange: onFileInputChange,
            type: 'file',
            multiple: true,
            accept: '.jpg,.jpeg,.png',
            ref: fileInputRef,
        },
        fileSelectorProps: {
            onClick: onFileSelectorClick,
        },
        selectedFiles,
        startButtonProps: {
            onClick: onStartButtonProps,
        },
    };
};
