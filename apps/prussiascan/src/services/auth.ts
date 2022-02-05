type JoinInputType = {
    token: string;
    email: string;
};

type GetUserInputType = {
    token: string;
};

const AUTH_URL = process.env.AUTH_URL;
const API_ENV = process.env.API_ENV;

export const join = async (data: JoinInputType) => {
    return fetch(`${AUTH_URL}/${API_ENV}/auth/join`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((result) => result.json());
};

export const getUser = async ({ queryKey }: { queryKey: string[] }) => {
    const token = queryKey[1];
    return fetch(`${AUTH_URL}/${API_ENV}/auth/user`, {
        method: 'POST',
        body: JSON.stringify({
            token,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((result) => result.json());
};
