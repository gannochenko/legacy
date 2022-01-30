import { ServiceResponseType } from '../../type';

export type InviteInputType = {
    email: string;
};

export type InviteOutputType = ServiceResponseType<{}>;

export type JoinInputType = {
    email: string;
    token: string;
};

export type JoinOutputType = ServiceResponseType<{}>;

export type CreateUserInputType = {
    email: string;
};

export type CreateUserOutputType = ServiceResponseType<{
    id: string;
    email: string;
    createdAt: string;
}>;