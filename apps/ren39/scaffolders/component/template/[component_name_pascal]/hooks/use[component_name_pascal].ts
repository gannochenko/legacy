import { ForwardedRef } from 'react';
import { <%- component_name_pascal %>PropsType } from '../type';
import { useRootRef } from '../../../hooks'

export const use<%- component_name_pascal %> = <E extends HTMLDivElement>(
    ref: ForwardedRef<E>,
    { propA, ...props }: <%- component_name_pascal %>PropsType
) => {
    const rootRef = useRootRef<E>(ref);

    return {
        rootProps: {
            ...props, // rest props go to the root node, as before
            ref: rootRef,
        },
    };
};
