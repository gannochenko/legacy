import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { JoinPropsType } from '../type';
import { join } from '../../../../services/auth';
import { storeToken } from '../../../../util/token';

export const useJoin = <E extends HTMLDivElement>({
    token,
    email,
    ...props
}: JoinPropsType) => {
    const joinMutation = useMutation('join', join, {
        retry: false,
    });

    const { isLoading, isSuccess, isError, data } = joinMutation;

    useEffect(() => {
        joinMutation.mutate({ token, email });
    }, [token, email]);

    useEffect(() => {
        if (isSuccess) {
            storeToken(data?.data?.token ?? '');
        }
    }, [isSuccess, data]);

    return {
        rootProps: props,
        isLoading,
        isSuccess,
        isError,
    };
};
