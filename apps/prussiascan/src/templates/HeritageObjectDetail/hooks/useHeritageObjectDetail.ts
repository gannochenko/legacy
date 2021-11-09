import { useMemo } from 'react';
import { HeritageObjectDetailPropsType } from '../type';

export const useHeritageObjectDetail = ({
    data,
    path,
    ...props
}: HeritageObjectDetailPropsType) => {
    const location = useMemo(() => ({ pathname: path ?? '' }), [path]);

    const itemData = data?.allHeritageObject?.nodes?.[0] ?? {};
    const { content, name, previewPhotoImg } = itemData;

    return {
        rootProps: props,
        pageLayoutProps: {
            location,
            title: name ?? '',
        },
        imageProps: {
            image: previewPhotoImg?.childImageSharp?.gatsbyImageData,
            alt: name,
        },
        data: itemData,
        content: content ?? '',
    };
};
