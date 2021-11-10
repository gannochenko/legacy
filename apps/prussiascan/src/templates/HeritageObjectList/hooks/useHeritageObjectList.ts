import { ChangeEvent, Ref, useMemo } from 'react';
import { navigate } from 'gatsby';
import {
    fillTemplate,
    HERITAGE_LIST,
    HERITAGE_LIST_PAGE,
} from '../../../pathTemplates';

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
            onChange: (event: ChangeEvent<unknown>, newPage: number) => {
                navigate(
                    fillTemplate(
                        newPage === 1 ? HERITAGE_LIST : HERITAGE_LIST_PAGE,
                        { page: newPage },
                    ),
                    {
                        replace: true,
                    },
                );
            },
        },
        data: data?.allHeritageObject?.nodes ?? [],
    };
};
