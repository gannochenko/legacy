import React, { FC } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import SimpleReactLightbox from 'simple-react-lightbox';

import { theme, GlobalStyle } from '../../style';
import { markdownComponents } from './markdown-components';
import { StateProviders } from '../../states/providers';

const queryClient = new QueryClient();

export const Providers: FC = ({ children }) => {
    return (
        <SimpleReactLightbox>
            <MUIThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>
                    <>
                        <GlobalStyle />
                        <QueryClientProvider client={queryClient}>
                            <MDXProvider components={markdownComponents}>
                                <StateProviders>{children}</StateProviders>
                            </MDXProvider>
                        </QueryClientProvider>
                    </>
                </ThemeProvider>
            </MUIThemeProvider>
        </SimpleReactLightbox>
    );
};
