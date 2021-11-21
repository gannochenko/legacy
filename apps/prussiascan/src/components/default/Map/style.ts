import styled, { css } from 'styled-components';
import {
    marginProps,
    reset,
    getPropsBlocker,
} from '@gannochenko/ui.styled-components';

import { MapRootPropsType } from './type';

const getRootStyle = ({ height }: MapRootPropsType) => {
    let result = {};

    if (height) {
        result = css`
            ${result};
            height: ${height};
        `;
    }

    return result;
};

export const MapRoot = styled.div.withConfig(getPropsBlocker)<MapRootPropsType>`
    ${reset};
    background-color: #e5e4e4;
    position: relative;
    &:before {
        position: absolute;
        top: 30%;
        left: calc(50% - 117px / 2);
        content: 'Карта загружается';
        font-size: 0.8rem;
    }
    ${marginProps};
    ${getRootStyle};
`;
