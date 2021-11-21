import { HeritageObjectDetailPropsType } from '../type';
import { makePublicPath } from '../../../../util/makePublicPath';
import { heritageStatusMap } from '../../../../maps/HeritageStatus';

export const useHeritageObjectDetail = <E extends HTMLDivElement>({
    data,
    ...props
}: HeritageObjectDetailPropsType) => {
    const name = data?.name ?? '';
    const content = data?.content ?? '';
    const previewPhoto = data?.previewPhoto ?? '';

    const previewPhotoURL = makePublicPath(previewPhoto);
    const previewImage =
        data?.previewPhotoImg?.childImageSharp?.gatsbyImageData;

    const headerImage = data?.headerPhotoImg?.childImageSharp?.gatsbyImageData;

    const nameDe = data?.nameDe || '';
    const locationDescription = data?.locationDescription || '';

    const heritageStatus = data?.heritageStatus || '';
    let heritageStatusLabel = '';
    if (heritageStatus && heritageStatus in heritageStatusMap) {
        heritageStatusLabel = heritageStatusMap[heritageStatus];
    }

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
        mapProps: {
            locations: data?.location ?? [],
        },
        content: content ?? '',
        pageHeaderProps: {
            image: headerImage,
            imageAlt: name,
            imageOverlayOpacity: 0.7,
            containerMaxWidth: '100%',
        },
        name: data?.name ?? '',
        nameDe: nameDe,
        locationDescription,
        heritageStatusLabel,

        showNameDe: !!nameDe,
        showLocationDescription: !!locationDescription,
        showHeritageStatusLabel: !!heritageStatusLabel,
    };
};