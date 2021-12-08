import styled from 'styled-components';
import { muiSpacing } from '@gannochenko/ui.styled-components';

export const HeaderRoot = styled.header`
    position: relative;
    min-width: 320px;
    flex-shrink: 0;
`;

export const HeaderOffset = styled.div`
    height: ${muiSpacing(10)};
`;
