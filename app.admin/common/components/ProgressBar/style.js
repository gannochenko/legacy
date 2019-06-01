import styled from 'styled-components';
// import {
//   align
// } from 'sc-companion';
import { withTheme } from '../../style/global';

export const ProgressBarContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
`;

export const Progress = withTheme(styled.div`
    width: ${props => props.width || '0'}%;
    height: ${props => (!props.fading ? '0.3rem' : '0')};
    background-color: ${props => props.theme.progressBar.color};
    transition: width 300ms ease, height 700ms ease;
`);
