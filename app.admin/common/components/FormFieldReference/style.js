import styled from 'styled-components';
import { withTheme } from '../../style/global';
import { stdInput, fgColor, icon } from 'sc-companion';

// export const Selected = withTheme(styled.a`
//     width: 100%;
//     ${props => stdInput(props.theme.input, !!props.error)}
//     display: block;
// `);

export const List = styled.div``;

export const ItemPicker = withTheme(styled.div`
    background-color: white;
    border: 1px solid ${props => props.theme.input.color.hout};
    border-radius: 2px;
`);

export const AddButton = withTheme(styled.div`
    ${icon('add_box', '1.5rem')}
    line-height: 100%;
    ${props =>
        fgColor(
            props.theme.button.color.hover,
            props.theme.button.color.hout,
            '200ms',
        )}
    cursor: pointer;
`);
