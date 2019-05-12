import styled, { keyframes } from 'styled-components';
import { align, fixedCover, media, icon, fgColor, group } from 'sc-companion';

export const defaultTheme = {
    grid: {
        resolution: 12,
        breakpoints: {
            xs: [null, 767], // max-width: 767
            sm: [768, 991], // min-width: 768 and max-width: 991
            md: [992, 1199], // min-width: 992 and max-width: 1199
            lg: [1200, null], // min-width: 1200
        },
    },
    cross: {
        color: {
            hover: '#000',
            hout: '#000',
        },
    },
};

const appear = keyframes`
  from {
    transform: translateY(-40px);
    opacity: 0;
  }

  to {
    transform: translate(0);
    opacity: 1;
  }
`;

export const Overlay = styled.div`
    ${props => align(props.central ? 'center' : 'top', 'center')}
    ${fixedCover()}
  overflow-y: auto;
    background-color: #1b273333;
    ${props =>
        media({ all: 'padding: 2rem 0;', xs: 'padding: 0;' }, props.theme.grid)}
`;

export const Panel = styled.div`
  max-height: none;
  background-color: white;
  border-radius: 2px;
  border: 1px solid #868b9940;
  box-shadow: 0 8px 10px 0 #0000000d;
  position: relative;
  min-width: 10rem;
  ${props =>
      media(
          { all: 'max-width: 50rem;', xs: 'max-width: none; width: 100%;' },
          props.theme.grid,
      )}
  animation: ${appear} 200ms ease;
  ${props => media({ xs: 'animation: none;' }, props.theme.grid)}
`;

export const PanelOffset = styled.div`
    padding: 1.5rem;
`;

export const Cross = styled.div`
    ${icon('close', '1rem', '0.5rem')}
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    ${props =>
        fgColor(
            props.theme.cross.color.hout,
            props.theme.cross.color.hover,
            '200ms',
        )}
`;

export const Question = styled.div`
    font-size: 1.2rem;
    padding-bottom: 1rem;
`;

export const Buttons = styled.div`
    ${group(null, '0.5rem')}
`;
