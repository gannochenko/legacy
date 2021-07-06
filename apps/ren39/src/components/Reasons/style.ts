import styled, { css } from 'styled-components';
import {
    marginProps,
    reset,
    getPropBlocker,
} from '@gannochenko/ui.styled-components';

import { ReasonsRootPropsType } from './type';

// all unwanted custom props should be blacklisted
const customProps = {};

const getRootStyle = ({ propA }: ReasonsRootPropsType) => {
    let result = {};

    // if (propA) {
    //     result = css`
    //         ${result};
    //         color: grey;
    //         // some other css
    //     `;
    // }

    // maybe some other props

    return result;
};

export const ReasonsRoot = styled.div.withConfig(
    getPropBlocker(customProps),
)<ReasonsRootPropsType>`
    ${reset};
    ${getRootStyle};
    ${marginProps};
`;
