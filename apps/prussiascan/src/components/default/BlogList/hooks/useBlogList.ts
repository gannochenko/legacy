import { Ref } from 'react';
import { BlogListPropsType } from '../type';

export const useBlogList = (
    ref: Ref<HTMLDivElement>,
    { data, ...props }: BlogListPropsType,
) => {
    return {
        rootProps: {
            ...props, // rest props go to the root node, as before
            ref, // same for the ref
        },
        data: data || [],
    };
};
