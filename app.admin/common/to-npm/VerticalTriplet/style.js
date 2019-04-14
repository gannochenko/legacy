import styled from 'styled-components';
import { align } from 'sc-companion';

export const VerticalTriplet = styled.div`
    ${align('top', 'stretch', 'column')}
    height: 100%;
`;

export const Top = styled.div`
    flex-shrink: 0;
`;

export const Middle = styled.div`
    ${align('stretch', 'left')}
    flex-grow: 2;
`;

export const Bottom = styled.div`
    flex-shrink: 0;
`;
