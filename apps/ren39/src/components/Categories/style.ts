import styled, { css } from 'styled-components';
import {
    marginProps,
    reset,
    getPropBlocker,
    muiSpacing,
} from '@gannochenko/ui.styled-components';
import { Link } from 'gatsby';

import { CategoriesRootPropsType } from './type';

// all unwanted custom props should be blacklisted
const customProps = {};

const getRootStyle = ({ height }: CategoriesRootPropsType) => {
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

export const CategoriesRoot = styled.div.withConfig(
    getPropBlocker(customProps),
)<CategoriesRootPropsType>`
    ${reset};
    ${getRootStyle};
    ${marginProps};
    margin-top: ${muiSpacing(10.5)};
    > :not(:first-child) {
        margin-left: ${muiSpacing(5)};
    }
`;

export const CategoriesLink = styled(Link)`
    text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')};
`;
