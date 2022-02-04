type JoinType = {
    token: string;
    email: string;
};

const AUTH_URL = process.env.AUTH_URL;
const API_ENV = process.env.API_ENV;

export const join = async (message: JoinType) => {
    return fetch(`${AUTH_URL}/${API_ENV}/auth/join`, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((result) => result.json());
};
