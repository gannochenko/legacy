import React from 'react';
import { createGlobalStyle } from 'styled-components';
import _theme from './theme';
import { makeGrid } from 'sc-companion';

export const theme = _theme;
export const ThemeContext = React.createContext(theme);
export const withTheme = Component => {
    return props => (
        <ThemeContext.Consumer>
            {value => <Component {...props} theme={value} />}
        </ThemeContext.Consumer>
    );
};
export const Grid = makeGrid(withTheme);
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
    color: ${props => props.theme.body.text.color};
    font-family: Georgia, sans-serif;
    min-width: 320px;
    background-color: ${props => props.theme.body.background.color};
  }

  html, body, #root {
    height: 100vh;
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
