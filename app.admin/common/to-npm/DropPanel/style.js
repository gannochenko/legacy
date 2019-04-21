import styled from 'styled-components';
// import {
//   align
// } from 'sc-companion';
// import {
// 	withTheme,
// 	stdLink,
// } from '../../style/global';

export const DropPanel = styled.div`
    position: relative;
`;

export const Panel = styled.div`
    position: absolute;
    left: 0;
    top: 100%;
    ${props => (props.theme ? `z-index: ${props.theme.zIndex};` : '')}
    ${props => (props.open ? '' : 'display: none;')}
    margin-bottom: 1rem;
`;

export const PanelInner = styled.div`
    margin-top: ${props => (props.theme ? props.theme.panelVOffset : '')};
`;