import styled from 'styled-components';
import { iconLabel } from 'sc-companion';

const thPadding = '1rem';

export const Container = styled.div``;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const THead = styled.thead``;

export const TBody = styled.tbody``;

export const TH = styled.th`
    text-align: left;
    padding: 0.5rem 1rem;
    color: #b6b9c2;
    border-bottom: 1px solid #b6b9c2;
`;

export const TR = styled.tr``;

export const TD = styled.td`
    padding: ${thPadding};
    border-bottom: 1px solid #b6b9c2;
`;

export const HeaderLink = styled.div`
    ${iconLabel('arrow_drop_down')}
`;
