import React, { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, Box } from '@mui/material';

import { Typography } from '../Typography';
import { FileUploaderPropsType } from './type';
import { FileUploaderRoot, FileUploaderFiles } from './style';
import { FileUploaderFile } from './FileUploaderFile';
import { useFileUploader } from './hooks/useFileUploader';

export const FileUploader: FC<FileUploaderPropsType> = (props) => {
    const { rootProps, dialogProps } = useFileUploader(props);

    return (
        <FileUploaderRoot {...rootProps}>
            <Dialog {...dialogProps}>
                <DialogTitle>Загрузка фотографий</DialogTitle>
                <DialogContent>
                    <FileUploaderFiles>
                        <FileUploaderFile />
                        <FileUploaderFile />
                        <FileUploaderFile />
                        <FileUploaderFile />
                        <FileUploaderFile />
                        <FileUploaderFile />
                        <FileUploaderFile />
                        <FileUploaderFile />
                        <FileUploaderFile />
                        <FileUploaderFile />
                        <FileUploaderFile />
                        <FileUploaderFile />
                        <FileUploaderFile />
                        <FileUploaderFile />
                        <FileUploaderFile />
                    </FileUploaderFiles>
                    {/*<Typography*/}
                    {/*    id="modal-modal-title"*/}
                    {/*    variant="h6"*/}
                    {/*    component="h2"*/}
                    {/*>*/}
                    {/*    Text in a modal*/}
                    {/*</Typography>*/}
                </DialogContent>
            </Dialog>
        </FileUploaderRoot>
    );
};
