import styled from '@emotion/styled';
import {
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
    ${({ filePreview }) => backgroundCover(filePreview)};

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
    margin-top: ${muiSpacing(0.5)};
`;

export const FileUploaderFileSpinnerContainer = styled.div`
    color: ${muiColor('grey.600')};
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: opacity 200ms ease;
    background-color: ${muiColor('background.default')};
    padding: ${muiSpacing(2)};
    ${borderRadius()};
`;
