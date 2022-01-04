import styled from 'styled-components';
import {
    marginProps,
    reset,
    getPropsBlocker,
    muiSpacing,
} from '@gannochenko/ui.emotion';

import { TagCloudRootPropsType } from './type';

export const TagCloudRoot = styled.div.withConfig(
    getPropsBlocker,
)<TagCloudRootPropsType>`
    ${reset};
    & > * {
        margin-right: ${muiSpacing(1)};
        margin-bottom: ${muiSpacing(1)};
    }
    ${marginProps};
`;
