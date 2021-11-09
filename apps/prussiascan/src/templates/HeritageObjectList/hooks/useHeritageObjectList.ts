import { Ref, useMemo } from 'react';
import { HeritageObjectListPropsType } from '../type';

export const useHeritageObjectList = (
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
        },
        paginationProps: {
            count: pageContext?.numPages ?? 0,
            page: pageContext?.currentPage ?? 1,
        },
        data: data?.allHeritageObject?.nodes ?? [],
    };
};
