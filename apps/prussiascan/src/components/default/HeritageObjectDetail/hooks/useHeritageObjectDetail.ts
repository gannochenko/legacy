import { HeritageObjectDetailPropsType } from '../type';
import { heritageStatusMap } from '../../../../maps/HeritageStatus';
import { ImageGalleryImageType } from '../../ImageGallery/type';

export const useHeritageObjectDetail = <E extends HTMLDivElement>({
    data,
    ...props
}: HeritageObjectDetailPropsType) => {
    const name = data?.name ?? '';
    const content = data?.content ?? '';
    const nameDe = data?.nameDe || '';
    const locationDescription = data?.locationDescription || '';
    const heritageStatus = data?.heritageStatus || '';
    let heritageStatusLabel = '';
    if (heritageStatus && heritageStatus in heritageStatusMap) {
        heritageStatusLabel = heritageStatusMap[heritageStatus];
    }

    const headerImage =
        data?.headerPhotoImage?.childImageSharp?.gatsbyImageData;

    // const headerImageUrl = data?.headerPhotoImage?.url;

    const galleryImages: ImageGalleryImageType[] = [];
    const photos = data?.photos ?? [];
    const photoImages = data?.photoImages ?? [];
    if (photos.length) {
        for (let i = 0; i < photos.length; i++) {
            const photo = photos[i];
            const photoImage = photoImages[i];
            galleryImages.push({
                childImageSharp: photoImage.childImageSharp,
                url: photoImage.url,
                author: photo.author,
                source: photo.source,
                uploadedAt: photo.uploadedAt,
                capturedAt: photo.capturedAt,
                capturedYearStart: photo.capturedYearStart,
                capturedYearEnd: photo.capturedYearEnd,
            });
        }
    }

    console.log(galleryImages);
    console.log(data);

    return {
        rootProps: props,
        // showPhoto: !!previewPhoto,
        // imageProps: {
        //     image: previewImage,
        //     alt: name,
        // },
        // imageLinkProps: {
        //     href: previewPhotoURL,
        // },
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
        imageGalleryProps: {
            images: galleryImages,
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
