import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { fontMaterialIcons } from 'sc-companion';
import makeCss from './css';

export const ThemeContext = React.createContext();
export const withTheme = (Component, path = null) => {
    const ComponentWithTheme = props => (
        <ThemeContext.Consumer>
            {value => (
                <Component {...props} theme={path ? value[path] : value} />
            )}
        </ThemeContext.Consumer>
    );

    return ComponentWithTheme;
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
