import styled from '@emotion/styled';
import {
    absoluteCover,
    backgroundCover,
    marginProps,
    muiColor,
    muiSpacing,
    muiTypography,
    reset,
} from '@gannochenko/ui.emotion';

import { FileUploaderFileRootPropsType } from './type';
import { borderRadius } from '../../../../style';

export const FileUploaderFileRoot = styled.div<FileUploaderFileRootPropsType>`
    ${reset};
    ${marginProps};
    width: ${muiSpacing(30)};
    height: ${muiSpacing(30)};
    padding: ${muiSpacing(2)};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    ${borderRadius()};
    position: relative;
    ${backgroundCover(
        `http://localhost:8000/static/132133ab75573c2ebec30259d186c06e/9a858/cd05b55c-54d5-47b8-b443-91ed22a6a2f4.webp`,
    )};

    &:hover {
        .FileUploaderFileRoot--DeleteIcon {
            opacity: 1;
        }
    }
`;

export const FileUploaderFileDeleteIcon = styled.div`
    color: ${muiColor('grey.600')};
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0;
    transition: opacity 200ms ease;
    background-color: ${muiColor('background.default')};
    padding: ${muiSpacing(2)};
    ${borderRadius()};
`;

export const FileUploaderFileDeleteIconText = styled.div`
    ${muiTypography('small')};
    margin-top: ${muiSpacing(2)};
`;
