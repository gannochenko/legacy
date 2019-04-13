import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { fgColor } from 'sc-companion';

export const ThemeContext = React.createContext();
export const withTheme = Component => {
    return props => (
        <ThemeContext.Consumer>
            {value => <Component {...props} theme={value} />}
        </ThemeContext.Consumer>
    );
};
export const GlobalStyle = withTheme(createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat');

  html {
    font-size: 20px;
  }

  body {
    padding: 0 !important;
    margin: 0 !important;
    font-weight: 400;
    line-height: 1.8;
    font-size: 0.8rem;
    letter-spacing: -0.05px;
    color: ${props => props.theme.body.color};
    font-family: Montserrat, sans-serif;
    min-width: 320px;
    background-color: ${props => props.theme.body.background.color};
  }

  html, body, #root {
    height: 100%;
  }

  button, a, input, textarea {
    outline: none;
  }

  * {
    box-sizing: border-box;
    &:before, &:after {
      box-sizing: border-box;
    }
  
    outline: none;
  }
`);

export const stdLink = (colorHover, colorHout) => `
    text-decoration: none;
    ${fgColor(colorHover, colorHout, '200ms')}
    cursor: pointer;
`;

export const stdInput = (colors, hasError = false, padding = '0.5rem') => {
    colors = colors || {};
    const { hover, hout, error } = colors;
    return `
    padding: ${padding};
    ${!hasError && hout ? `border: 1px solid ${hout};` : ''}
    ${hasError && error ? `border: 1px solid ${error};` : ''}
    ${
        hover
            ? `&:hover, &:focus, &:active {border-color: ${hover};}; transition: border-color 200ms ease;`
            : ''
    }
    border-radius: 2px;
  `;
};
