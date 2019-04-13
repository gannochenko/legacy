import styled from 'styled-components';
import { group, icon, fgColor } from 'sc-companion';
import { withTheme } from '../../style/global';

export const FieldSet = styled.div`
    ${group('0.5rem')}
`;

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
