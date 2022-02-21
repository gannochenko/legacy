import { useCallback, useRef, useState } from 'react';
import { Breakpoint } from '@mui/system';
import { LinearProgressProps } from '@mui/material/LinearProgress/LinearProgress';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import { FileUploaderPropsType, SelectedFileType } from '../type';
import { convertFileToBase64 } from '../util/convertFileToBase64';
import { useFileUploaderProcess } from './useFileUploaderProcess';

const FILE_LIMIT = 10;

export const useFileUploader = <E extends HTMLDivElement>({
    open,
    ...props
}: FileUploaderPropsType) => {
    const { t } = useTranslation();

    const { enqueueSnackbar } = useSnackbar();

    // const [showDragDropIndicator, setShowDragDropIndicator] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<SelectedFileType[]>([]);

    const { next, loading } = useFileUploaderProcess(props, {
        files: selectedFiles,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const onFileInputChange = useCallback(
        (event) => {
            const target = event.target as HTMLInputElement;
            const files = target.files;
            if (files) {
                let fileArray = Array.from(files);
                const fileLengthBefore = fileArray.length;
                const fileLimit = Math.abs(FILE_LIMIT - selectedFiles.length);

                fileArray = fileArray.slice(
                    0,
                    Math.min(fileLimit, fileArray.length),
                );

                if (fileLengthBefore !== fileArray.length) {
                    enqueueSnackbar(t('FileUploader.maxFilesReached'), {
                        autoHideDuration: 4000,
                        variant: 'error',
                    });
                }

                if (!fileArray.length) {
                    return;
                }

                const selectedFilesLocal = fileArray.map((file) => ({
                    file,
                    id: Math.round(Math.random() * 100000).toString(),
                    preview: '',
                }));
                setSelectedFiles((prevState) => [
                    ...prevState,
                    ...selectedFilesLocal,
                ]);

                (async () => {
                    const previews = (
                        await Promise.all(
                            selectedFilesLocal.map((file) =>
                                convertFileToBase64(file),
                            ),
                        )
                    ).reduce<Record<string, SelectedFileType>>(
                        (result, item) => {
                            result[item.id] = item;
                            return result;
                        },
                        {},
                    );

                    setSelectedFiles((prevState) =>
                        prevState.map((item) => {
                            if (item.id in previews) {
                                item.preview = previews[item.id].preview;
                            }

                            return item;
                        }),
                    );
                })();
            }
        },
        [selectedFiles, enqueueSnackbar],
    );

    const onFileSelectorClick = useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, [fileInputRef.current]);

    // const onFileListDrop = useCallback((event: DragEvent) => {
    //     event.preventDefault();
    //
    //     if (event.dataTransfer.items) {
    //         for (let i = 0; i < event.dataTransfer.items.length; i++) {
    //             if (event.dataTransfer.items[i].kind === 'file') {
    //                 const file = event.dataTransfer.items[i].getAsFile()!;
    //                 console.log('... file[' + i + '].name = ' + file.name);
    //             }
    //         }
    //     } else {
    //         // Use DataTransfer interface to access the file(s)
    //         for (let i = 0; i < event.dataTransfer.files.length; i++) {
    //             console.log(
    //                 '... file[' +
    //                     i +
    //                     '].name = ' +
    //                     event.dataTransfer.files[i].name,
    //             );
    //         }
    //     }
    // }, []);

    // useEffect(() => {
    //     window.addEventListener('drop', (event) => {
    //         event.preventDefault();
    //         console.log('DROP!');
    //     });
    // }, []);

    // const onFileListDragEnter = useCallback(() => {
    //     setShowDragDropIndicator(true);
    // }, []);
    //
    // const onFileListDragLeave = useCallback(() => {
    //     setShowDragDropIndicator(false);
    // }, []);

    return {
        rootProps: {
            ...props, // rest props go to the root node, as before
        },
        dialogProps: {
            open: !!open,
            onClose: () => {},
            maxWidth: 'lg' as Breakpoint,
            fullWidth: true,
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
            disabled: loading || selectedFiles.length >= FILE_LIMIT,
        },
        selectedFiles,
        startButtonProps: {
            disabled: loading || !selectedFiles.length,
            onClick: next,
        },
        getFileProps: (file: SelectedFileType) => ({
            file,
            loading,
            onDeleteFileClick: () => {
                setSelectedFiles((prevState) => {
                    return prevState.filter(
                        (selectedFile) => selectedFile.id !== file.id,
                    );
                });
            },
        }),
        fileListProps: {
            // onDrop: onFileListDrop,
            // onDragEnter: onFileListDragEnter,
            // onDragLeave: onFileListDragLeave,
        },
        showDragDropIndicator: false,
        progressProps: {
            variant: 'determinate' as LinearProgressProps['variant'],
            value: 0,
        },
    };
};
