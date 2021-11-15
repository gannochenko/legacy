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
    };
};
