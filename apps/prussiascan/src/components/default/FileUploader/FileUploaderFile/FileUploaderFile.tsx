import React, { FC } from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CircularProgress from '@mui/material/CircularProgress';

import { FileUploaderFilePropsType } from './type';
import {
    FileUploaderFileRoot,
    FileUploaderFileDeleteIcon,
    FileUploaderFileDeleteIconText,
    FileUploaderFileSpinnerContainer,
} from './style';
import { useFileUploaderFile } from './hooks/useFileUploaderFile';

export const FileUploaderFile: FC<FileUploaderFilePropsType> = (props) => {
    const { rootProps, showDeleteButton, showLoadingSpinner } =
        useFileUploaderFile(props);

    return (
        <FileUploaderFileRoot {...rootProps}>
            {showLoadingSpinner && (
                <FileUploaderFileSpinnerContainer>
                    <CircularProgress variant="determinate" value={35} />
                </FileUploaderFileSpinnerContainer>
            )}
            {showDeleteButton && (
                <FileUploaderFileDeleteIcon className="FileUploaderFileRoot--DeleteIcon">
                    <RemoveCircleIcon />
                    <FileUploaderFileDeleteIconText>
                        Удалить файл
                    </FileUploaderFileDeleteIconText>
                </FileUploaderFileDeleteIcon>
            )}
        </FileUploaderFileRoot>
    );
};
