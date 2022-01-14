import { Ref, useMemo } from 'react';

import { HeritageObjectListPropsType } from '../type';

export const useHeritageObjectListTemplate = (
    ref: Ref<HTMLDivElement>,
    { data, path, pageContext, ...props }: HeritageObjectListPropsType,
) => {
    const location = useMemo(() => ({ pathname: path ?? '' }), [path]);

    return {
        rootProps: {
            ...props, // rest props go to the root node, as before
            ref, // same for the ref
        },
        pageLayoutProps: {
            location,
            title: 'Объекты',
        },
        objectListProps: {
            data: data?.allHeritageObject?.nodes ?? [],
            ...pageContext,
        },
    };
};
