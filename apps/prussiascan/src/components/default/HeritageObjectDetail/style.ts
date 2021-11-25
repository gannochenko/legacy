import styled from 'styled-components';
import {
    marginProps,
    reset,
    muiSpacing,
} from '@gannochenko/ui.styled-components';

import { propsBlocker } from '../../../util';
import { HeritageObjectDetailRootPropsType } from './type';

export const HeritageObjectDetailRoot = styled.div.withConfig(
    propsBlocker,
)<HeritageObjectDetailRootPropsType>`
    ${reset};
    ${marginProps};
`;

export const HeritageObjectDetailData = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: ${muiSpacing(20)};
`;

export const HeritageObjectDetailTitle = styled.h1`
    max-width: 60%;
`;

export const HeritageObjectDetailGerman = styled.div`
    margin-top: ${muiSpacing(3)};
`;

export const HeritageObjectDetailLocation = styled.div`
    margin-top: ${muiSpacing(3)};
`;

export const HeritageObjectSummary = styled.div`
    margin-top: ${muiSpacing(6)};
`;

export const HeritageObjectDetailSummaryLine = styled.div`
    font-size: 0.8rem;
    &:not(:last-child) {
        margin-bottom: ${muiSpacing(2)};
    }
`;
