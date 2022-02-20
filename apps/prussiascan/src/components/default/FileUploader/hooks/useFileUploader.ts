import { useCallback, useRef, useState, DragEvent, useEffect } from 'react';
import { Breakpoint } from '@mui/system';
import { FileUploaderPropsType, SelectedFileType } from '../type';
import { convertFileToBase64 } from '../util/convertFileToBase64';
import { LinearProgressProps } from '@mui/material/LinearProgress/LinearProgress';

export const useFileUploader = <E extends HTMLDivElement>({
    open,
    ...props
}: FileUploaderPropsType) => {
    const [showDragDropIndicator, setShowDragDropIndicator] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<SelectedFileType[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const onFileInputChange = useCallback((event) => {
        const target = event.target as HTMLInputElement;
        const files = target.files;
        if (files) {
            const selectedFiles = Array.from(files).map((file) => ({
                file,
                id: Math.round(Math.random() * 100000).toString(),
                preview: '',
            }));
            setSelectedFiles((prevState) => [...prevState, ...selectedFiles]);

            (async () => {
                const previews = (
                    await Promise.all(
                        selectedFiles.map((file) => convertFileToBase64(file)),
                    )
                ).reduce<Record<string, SelectedFileType>>((result, item) => {
                    result[item.id] = item;
                    return result;
                }, {});

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
    }, []);
    const onFileSelectorClick = useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, [fileInputRef.current]);

    const onStartButtonProps = useCallback(() => {}, []);

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
        },
        selectedFiles,
        startButtonProps: {
            disabled: !selectedFiles.length,
            onClick: onStartButtonProps,
        },
        getFileProps: (file: SelectedFileType) => ({
            file,
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
        showDragDropIndicator,
        progressProps: {
            variant: 'determinate' as LinearProgressProps['variant'],
            value: 0,
        },
    };
};
