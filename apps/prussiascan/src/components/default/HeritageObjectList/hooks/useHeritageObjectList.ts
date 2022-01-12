import { ChangeEvent, Ref, useMemo } from 'react';
import { navigate } from 'gatsby';
import {
    fillTemplate,
    HERITAGE_DETAIL,
    HERITAGE_LIST,
    HERITAGE_LIST_PAGE,
} from '../../../../pathTemplates';

import { HeritageObjectListPropsType } from '../type';

export const useHeritageObjectList = (
    ref: Ref<HTMLDivElement>,
    { data, pageContext, ...props }: HeritageObjectListPropsType,
) => {
    const currentPage = pageContext?.currentPage ?? 1;
    const items = useMemo(() => {
        return (data ?? []).map((item) => {
            const { slug, name, previewPhotoImage } = item;
            const path = fillTemplate(HERITAGE_DETAIL, {
                slug,
            }) as string;

            return {
                slug,
                name,
                image: previewPhotoImage?.childImageSharp.gatsbyImageData,
                path,
            };
        });
    }, [data]);

    return {
        rootProps: {
            ...props, // rest props go to the root node, as before
            ref, // same for the ref
        },
        paginationProps: {
            count: pageContext?.numPages ?? 0,
            page: currentPage,
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
        nextPageProps: {
            to: fillTemplate(HERITAGE_LIST_PAGE, { page: currentPage + 1 }),
        },
        data: items,
    };
};
