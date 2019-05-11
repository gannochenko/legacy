import styled from 'styled-components';
import { align, fixedCover } from 'sc-companion';
// import {
// 	withTheme,
// 	stdLink,
// } from '../../style/global';

export const Overlay = styled.div`
    ${props => align(props.central ? 'center' : 'top', 'center')}
    ${fixedCover()}
  overflow-y: auto;
    background-color: #1b273333;
    padding: 2rem 0;
`;

export const Panel = styled.div`
    max-height: none;
    background-color: white;
    border-radius: 2px;
    border: 1px solid #868b9940;
    box-shadow: 0 8px 10px 0 #0000000d;
    max-width: 20rem;
    min-width: 15rem;
`;

export const PanelOffset = styled.div`
    padding: 2rem;
`;
