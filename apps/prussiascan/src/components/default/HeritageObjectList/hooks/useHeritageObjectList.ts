import { Ref } from 'react';
import { HeritageObjectListPropsType } from '../type';

export const useHeritageObjectList = (
    ref: Ref<HTMLDivElement>,
    { data, ...props }: HeritageObjectListPropsType,
) => {
    console.log('data');
    console.log(data);

    return {
        rootProps: {
            ...props, // rest props go to the root node, as before
            ref, // same for the ref
        },
        data: data || [],
    };
};
