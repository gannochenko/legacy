import { useCallback, useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { useQuery } from 'react-query';
import { getUser } from '../services/auth';

type UserType = {
    id: string;
    roles: string[];
};

const TOKEN_LS_KEY = 'prussiascan:token';

export const storeToken = (token: string) => {
    if (typeof window === 'undefined' || !token) {
        return;
    }

    window.localStorage.setItem(TOKEN_LS_KEY, token);
};

export const getToken = () => {
    if (typeof window === 'undefined') {
        return null;
    }
    window.localStorage.getItem(TOKEN_LS_KEY);
};

export const revokeToken = () => {
    if (typeof window === 'undefined') {
        return;
    }
    window.localStorage.removeItem(TOKEN_LS_KEY);
};

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

    const revoke = userQueryData?.revoke ?? false;
    const userData = userQueryData?.data;
    const userId = userData?.id;
    const userRoles = userData?.attributes?.roles ?? [];

    useEffect(() => {
        if (isSuccess && revoke) {
            revokeToken();
            setSerial((previousSerial) => previousSerial + 1);
        }
    }, [isSuccess, revoke]);

    const user: UserType | undefined =
        isSuccess && !revoke && !!userId
            ? {
                  id: userId,
                  roles: userRoles,
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
