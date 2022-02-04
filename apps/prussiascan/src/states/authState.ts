import { useState } from 'react';
import { createContainer } from 'unstated-next';

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

    return {
        user,
        signOut: () => {},
        signIn: () => {},
        isAuthenticated: !!user.id,
    };
};

export const AuthState = createContainer(useAuth);
