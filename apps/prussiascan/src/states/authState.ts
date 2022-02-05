import { useCallback, useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { useQuery } from 'react-query';
import { getUser } from '../services/auth';

type UserType = {
    id: string;
};

const TOKEN_LS_KEY = 'prussiascan:token';

export const storeToken = (token: string) => {
    if (!token) {
        return;
    }

    window.localStorage.setItem(TOKEN_LS_KEY, token);
};

export const getToken = () => window.localStorage.getItem(TOKEN_LS_KEY);

export const revokeToken = () => window.localStorage.removeItem(TOKEN_LS_KEY);

const noop = () => {};

const useAuth = () => {
    const [, setSerial] = useState(1);

    const token = getToken();
    const hasToken = !!token;

    const { isSuccess, data: userQueryData } = useQuery(
        ['userData', token],
        // @ts-ignore
        getUser,
        {
            enabled: hasToken,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: false,
        },
    );

    const expired = userQueryData?.expired ?? false;
    const userData = userQueryData?.data;
    const userId = userData?.id;

    useEffect(() => {
        if (isSuccess && expired) {
            revokeToken();
            setSerial((previousSerial) => previousSerial + 1);
        }
    }, [isSuccess, expired]);

    const user: UserType | undefined =
        isSuccess && !expired && !!userId
            ? {
                  id: userId,
              }
            : undefined;

    const setToken = useCallback((token: string) => {
        storeToken(token);
        setSerial((previousSerial) => previousSerial + 1);
    }, []);

    const signOut = useCallback(() => {
        revokeToken();
        setSerial((previousSerial) => previousSerial + 1);
    }, []);

    return {
        user,
        signOut,
        signIn: noop,
        setToken,
        isAuthenticated: !!user?.id,
    };
};

export const AuthState = createContainer(useAuth);
