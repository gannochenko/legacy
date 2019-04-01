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
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  html {
    font-size: 20px;
  }

  body {
    padding: 0 !important;
    margin: 0 !important;
    font-weight: 400;
    line-height: 1.8;
    letter-spacing: -0.05px;
    color: ${props => props.theme.body.color};
    font-family: Roboto, sans-serif;
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

export const stdLink = (hover, hout) => `
    text-decoration: none;
    ${fgColor(hover, hout, '200ms')}
`;
