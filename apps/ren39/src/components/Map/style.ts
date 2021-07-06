import styled, { css } from 'styled-components';
import {
    marginProps,
    reset,
    getPropBlocker,
} from '@gannochenko/ui.styled-components';

import { MapRootPropsType } from './type';

// all unwanted custom props should be blacklisted
const customProps = {};

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

export const MapRoot = styled.div.withConfig(
    getPropBlocker(customProps),
)<MapRootPropsType>`
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
