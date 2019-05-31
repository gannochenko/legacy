import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { fgColor, fontMaterialIcons } from 'sc-companion';
import makeCss from './css';

export const ThemeContext = React.createContext();
export const withTheme = Component => {
    return props => (
        <ThemeContext.Consumer>
            {value => <Component {...props} theme={value} />}
        </ThemeContext.Consumer>
    );
};

export const GlobalStyle = withTheme(createGlobalStyle`
    ${props =>
        makeCss({
            theme: props.theme,
            prepend: `
            ${fontMaterialIcons()}
        `,
        })}
`);
