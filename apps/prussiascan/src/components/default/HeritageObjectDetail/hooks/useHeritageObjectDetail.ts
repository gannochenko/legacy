import { HeritageObjectDetailPropsType } from '../type';
import { makePublicPath } from '../../../../util/makePublicPath';

export const useHeritageObjectDetail = <E extends HTMLDivElement>({
    data,
    ...props
}: HeritageObjectDetailPropsType) => {
    const name = data?.name ?? '';
    const content = data?.content ?? '';
    const previewPhoto = data?.previewPhoto ?? '';

    const previewPhotoURL = makePublicPath(previewPhoto);
    const image = data?.previewPhotoImg?.childImageSharp?.gatsbyImageData;

    console.log(image);
    console.log(data);

    return {
        rootProps: props,
        showPhoto: !!previewPhoto,
        imageProps: {
            image,
            alt: name,
        },
        imageLinkProps: {
            href: previewPhotoURL,
        },
        content: content ?? '',
        pageHeaderProps: {
            image,
            imageAlt: name,
            imageOverlayOpacity: 0.7,
            containerMaxWidth: '100%',
        },
        name: data?.name ?? '',
    };
};
