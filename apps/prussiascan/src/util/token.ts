const TOKEN_LS_KEY = 'prussiascan:token';

export const storeToken = (token: string) => {
    if (!token) {
        return;
    }

    window.localStorage.setItem(TOKEN_LS_KEY, token);
};

export const getToken = () => window.localStorage.getItem(TOKEN_LS_KEY);

export const revokeToken = () => window.localStorage.removeItem(TOKEN_LS_KEY);

export const hasToken = () => !!window.localStorage.getItem(TOKEN_LS_KEY);
