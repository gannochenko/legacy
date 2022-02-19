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
    } = useFileUploader(props);

    return (
        <FileUploaderRoot {...rootProps}>
            <Dialog {...dialogProps}>
                <DialogTitle>Загрузка фотографий</DialogTitle>
                <DialogContent>
                    <FileUploaderFiles>
                        {selectedFiles.map((file, index) => (
                            <FileUploaderFile key={index} file={file} />
                        ))}
                        {/*<FileUploaderFile loading progress={30} />*/}
                        {/*<FileUploaderFile loading />*/}
                        <FileSelectorButton {...fileSelectorProps}>
                            <AddCircleOutlineIcon fontSize="inherit" />
                        </FileSelectorButton>
                    </FileUploaderFiles>
                    <FileUploaderActions>
                        <LinearProgress variant="determinate" value={35} />
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
