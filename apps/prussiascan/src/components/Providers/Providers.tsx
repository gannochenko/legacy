import React, { FC } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import SimpleReactLightbox from 'simple-react-lightbox';

import { theme, GlobalStyle } from '../../style';
import { MDXComponents } from './MDXComponents';
import { StateProviders } from '../../states/providers';
import { NetworkStatusProvider } from '../default';

const queryClient = new QueryClient();

/**
 * This is a top-level wrapper, it wraps everything else, including the ApplicationLayout.
 */
export const Providers: FC = ({ children }) => {
    return (
        <SimpleReactLightbox>
            <ThemeProvider theme={theme}>
                <>
                    <GlobalStyle />
                    <QueryClientProvider client={queryClient}>
                        <MDXProvider components={MDXComponents}>
                            <NetworkStatusProvider>
                                <StateProviders>{children}</StateProviders>
                            </NetworkStatusProvider>
                        </MDXProvider>
                    </QueryClientProvider>
                </>
            </ThemeProvider>
        </SimpleReactLightbox>
    );
};
