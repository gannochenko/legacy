import axios from 'axios';

type JoinType = {
    token: string;
    email: string;
};

const AUTH_URL = process.env.AUTH_URL;

export const join = async (message: JoinType) =>
    axios.post(`${AUTH_URL}/join`, message);
