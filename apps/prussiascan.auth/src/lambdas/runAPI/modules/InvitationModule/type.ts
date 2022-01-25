import { ServiceResponseType } from '../../type';

export type InviteInputType = {
    email: string;
};

export type InviteOutputType = ServiceResponseType<{}>;

export type JoinInputType = {
    token: string;
};

export type JoinOutputType = ServiceResponseType<{}>;
