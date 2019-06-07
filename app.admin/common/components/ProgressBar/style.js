import styled from 'styled-components';

export const defaultTheme = {
    bar: {
        color: '#966e1e',
    },
    color: 'transparent',
};

export const ProgressBarContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.color};
`;

export const Progress = styled.div`
    width: ${props => props.width || '0'}%;
    height: ${props => (!props.fading ? '0.3rem' : '0')};
    background-color: ${props => props.theme.bar.color};
    transition: width 300ms ease, height 700ms ease;
`;
