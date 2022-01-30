import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { JoinPropsType } from '../type';
import { join } from '../../../../services/auth';

export const useJoin = <E extends HTMLDivElement>({
    token,
    email,
    ...props
}: JoinPropsType) => {
    const joinMutation = useMutation(join);
    const { isLoading, isSuccess, isError, ...rest } = joinMutation;

    // useEffect(() => {
    //     joinMutation.mutate({ token, email });
    // }, [joinMutation, token, email]);

    console.log(rest);

    return {
        rootProps: props,
    };
};
