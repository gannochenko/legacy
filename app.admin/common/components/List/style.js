import styled from 'styled-components';
import { iconLabel, align, fgColor, group, ellipsis } from 'sc-companion';

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
    border-bottom: 1px solid #b6b9c2;
`;

export const TR = styled.tr``;

export const TD = styled.td`
    padding: ${thPadding};
    border-bottom: 1px solid #b6b9c2;
`;

export const HeaderLink = styled.div`
	height: 43px;
    ${props =>
        props.sortable
            ? iconLabel(props.sign, '1.2rem')
            : ''}
    ${props => (props.sortable ? 'cursor: pointer;' : '')}
    ${align('center', 'left')}
    color: #b6b9c2;
    ${props => (props.sortable ? fgColor('#b6b9c2', '#363636', '200ms') : '')}
    white-space: nowrap;
    max-width: 15rem;
    ${ellipsis()}
    user-select: none;
`;

export const Footer = styled.div`
    ${align('center', 'left')}
`;

export const Counter = styled.div`
    flex-grow: 2;
    padding: 1rem;
    color: #b6b9c2;
`;
