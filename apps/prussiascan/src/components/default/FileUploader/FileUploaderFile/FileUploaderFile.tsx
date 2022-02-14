import React, { FC } from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { FileUploaderFilePropsType } from './type';
import {
    FileUploaderFileRoot,
    FileUploaderFileDeleteIcon,
    FileUploaderFileDeleteIconText,
} from './style';
import { useFileUploaderFile } from './hooks/useFileUploaderFile';

export const FileUploaderFile: FC<FileUploaderFilePropsType> = (props) => {
    const { rootProps } = useFileUploaderFile(props);

    return (
        <FileUploaderFileRoot {...rootProps}>
            <FileUploaderFileDeleteIcon className="FileUploaderFileRoot--DeleteIcon">
                <RemoveCircleIcon />
                <FileUploaderFileDeleteIconText>
                    Удалить файл
                </FileUploaderFileDeleteIconText>
            </FileUploaderFileDeleteIcon>
        </FileUploaderFileRoot>
    );
};
