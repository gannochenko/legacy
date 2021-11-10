import { useMemo } from 'react';
import { HeritageObjectDetailPropsType } from '../type';
import { makePublicPath } from '../../../util/makePublicPath';

export const useHeritageObjectDetail = ({
    data,
    path,
    ...props
}: HeritageObjectDetailPropsType) => {
    const location = useMemo(() => ({ pathname: path ?? '' }), [path]);

    const itemData = data?.allHeritageObject?.nodes?.[0] ?? {};
    const { content, name, previewPhotoImg, previewPhoto } = itemData;

    const previewPhotoURL = makePublicPath(previewPhoto);

    return {
        rootProps: props,
        pageLayoutProps: {
            location,
            title: name ?? '',
        },
        showPhoto: !!previewPhoto,
        imageProps: {
            image: previewPhotoImg?.childImageSharp?.gatsbyImageData,
            alt: name,
        },
        imageLinkProps: {
            href: previewPhotoURL,
        },
        data: itemData,
        content: content ?? '',
    };
};
