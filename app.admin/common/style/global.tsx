import React, { forwardRef } from 'react';
import { createGlobalStyle } from 'styled-components';
import { fontMaterialIcons } from 'sc-companion';
import makeCss from './css';

export const ThemeContext = React.createContext({});
export const withTheme = (Component, path: string = '') => {
    const WithTheme = (props, ref) => (
        <ThemeContext.Consumer>
            {(value: object) => (
                <Component
                    {...props}
                    ref={ref}
                    theme={path.length ? value[path] : value}
                />
            )}
        </ThemeContext.Consumer>
    );

    const wrappedComponentName =
        Component.displayName || Component.name || 'Component';

    WithTheme.displayName = `withTheme(${wrappedComponentName})`;

    const WithThemeAndRef = forwardRef(WithTheme);

    return WithThemeAndRef;
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
