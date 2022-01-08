import React, { FC } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import SimpleReactLightbox from 'simple-react-lightbox';
import { Auth0Provider } from '@auth0/auth0-react';

import { theme, GlobalStyle } from '../../style';
import { MDXComponents } from './MDXComponents';
import { isDev } from '../../util';
import { StateProviders } from '../../states/providers';
import { NetworkStatusProvider } from '../default';
import { getWindow } from '../../util/getWindow';

const queryClient = new QueryClient();
const win = getWindow();

/**
 * This is a top-level wrapper, it wraps everything else, including the ApplicationLayout.
 */
export const Providers: FC = ({ children }) => {
    return (
        <SimpleReactLightbox>
            <ThemeProvider theme={theme}>
                <>
                    <GlobalStyle />
                    <Auth0Provider
                        domain={process.env.AUTH0_DOMAIN!}
                        clientId={process.env.AUTH0_CLIENT_ID!}
                        redirectUri={win ? win.location.origin : ''}
                        audience={
                            isDev()
                                ? `http://localhost:3000`
                                : `https://${process.env.AUTH0_DOMAIN}/api/v2/`
                        }
                        scope="read:current_user update:current_user_metadata"
                        cacheLocation={isDev() ? 'localstorage' : undefined}
                        useRefreshTokens={false}
                    >
                        <QueryClientProvider client={queryClient}>
                            <MDXProvider components={MDXComponents}>
                                <NetworkStatusProvider>
                                    <StateProviders>{children}</StateProviders>
                                </NetworkStatusProvider>
                            </MDXProvider>
                        </QueryClientProvider>
                    </Auth0Provider>
                </>
            </ThemeProvider>
        </SimpleReactLightbox>
    );
};
