import { HeritageObjectDetailPropsType } from '../type';
import { makePublicPath } from '../../../../util/makePublicPath';

export const useHeritageObjectDetail = <E extends HTMLDivElement>({
    data,
    ...props
}: HeritageObjectDetailPropsType) => {
    const name = data?.name ?? '';
    const content = data?.content ?? '';
    const previewPhoto = data?.previewPhoto ?? '';
    const headerPhoto = data?.headerPhoto ?? '';

    const previewPhotoURL = makePublicPath(previewPhoto);
    const previewImage =
        data?.previewPhotoImg?.childImageSharp?.gatsbyImageData;

    const headerPhotoURL = makePublicPath(headerPhoto);
    const headerImage = data?.headerPhotoImg?.childImageSharp?.gatsbyImageData;

    console.log(data);

    return {
        rootProps: props,
        showPhoto: !!previewPhoto,
        imageProps: {
            image: previewImage,
            alt: name,
        },
        imageLinkProps: {
            href: previewPhotoURL,
        },
        content: content ?? '',
        pageHeaderProps: {
            image: headerImage,
            imageAlt: name,
            imageOverlayOpacity: 0.7,
            containerMaxWidth: '100%',
        },
        name: data?.name ?? '',
    };
};
