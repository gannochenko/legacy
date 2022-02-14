import styled from '@emotion/styled';
import { marginProps, muiSpacing, reset } from '@gannochenko/ui.emotion';

import { FileUploaderRootPropsType } from './type';

export const FileUploaderRoot = styled.div<FileUploaderRootPropsType>`
    ${reset};
    ${marginProps};
`;

export const FileUploaderFiles = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${muiSpacing(2)};
`;
