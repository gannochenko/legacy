import React, { FC } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    LinearProgress,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { FileUploaderPropsType } from './type';
import {
    FileUploaderRoot,
    FileUploaderFiles,
    FileUploaderActions,
    FileUploaderActionButtons,
    FileSelectorButton,
    DragDropZoneIndicator,
} from './style';
import { FileUploaderFile } from './FileUploaderFile';
import { useFileUploader } from './hooks/useFileUploader';

export const FileUploader: FC<FileUploaderPropsType> = (props) => {
    const {
        rootProps,
        dialogProps,
        fileInputProps,
        fileSelectorProps,
        selectedFiles,
        startButtonProps,
        getFileProps,
        fileListProps,
        showDragDropIndicator,
        progressProps,
    } = useFileUploader(props);

    return (
        <FileUploaderRoot {...rootProps}>
            <Dialog {...dialogProps}>
                <DialogTitle>Загрузка фотографий</DialogTitle>
                <DialogContent>
                    <FileUploaderFiles {...fileListProps}>
                        {selectedFiles.map((file) => (
                            <FileUploaderFile
                                key={file.id}
                                {...getFileProps(file)}
                            />
                        ))}
                        <FileSelectorButton {...fileSelectorProps}>
                            <AddCircleOutlineIcon fontSize="inherit" />
                        </FileSelectorButton>
                        {showDragDropIndicator && <DragDropZoneIndicator />}
                    </FileUploaderFiles>
                    <FileUploaderActions>
                        <LinearProgress {...progressProps} />
                        <FileUploaderActionButtons>
                            <Button variant="contained" {...startButtonProps}>
                                Начать загрузку
                            </Button>
                        </FileUploaderActionButtons>
                    </FileUploaderActions>
                    <input {...fileInputProps} />
                </DialogContent>
            </Dialog>
        </FileUploaderRoot>
    );
};
