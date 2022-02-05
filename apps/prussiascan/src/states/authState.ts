import { useCallback } from 'react';
import { createContainer } from 'unstated-next';
import { useQuery } from 'react-query';
import { getUser } from '../services/auth';

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

const initialAuthState = {
    userId: '',
};

const useAuth = (initialState = initialAuthState) => {
    // const [data, setData] = useState(initialState);
    // const set = (newData: Partial<typeof initialAuthState>) =>
    //     setData({ ...data, ...newData });
    // const reset = () => setData({ ...initialAuthState });

    const user = {
        id: 'asdfdfsd',
    };

    const token = getToken();
    // @ts-ignore
    const result = useQuery(['userData', token], getUser, {
        enabled: !!token,
    });

    console.log(result.data);

    const setToken = useCallback((token: string) => {
        storeToken(token);
    }, []);

    return {
        user,
        signOut: () => {},
        signIn: () => {},
        setToken,
        isAuthenticated: !!user.id,
    };
};

export const AuthState = createContainer(useAuth);
