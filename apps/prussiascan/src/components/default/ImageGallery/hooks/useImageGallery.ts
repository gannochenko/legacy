import { Ref, useCallback } from 'react';
import { ImageGalleryImageType, ImageGalleryPropsType } from '../type';
import { eventBus } from '../../../../util/eventBus';
import { EventsEnum } from '../../../../util/events';

export const useImageGallery = (
    ref: Ref<HTMLDivElement>,
    { images, showAddImageButton, ...props }: ImageGalleryPropsType,
) => {
    const onAddImageButtonClick = useCallback(() => {
        eventBus.dispatch(EventsEnum.OBJECT_DETAIL_ADD_PHOTO_BUTTON_CLICK);
    }, []);

    return {
        rootProps: {
            ...props, // rest props go to the root node, as before
            ref, // same for the ref
        },
        getGatsbyImageProps: (image: ImageGalleryImageType) => {
            return {
                image: image.childImageSharp!.gatsbyImageData,
                alt: '',
                className: 'gatsby-resp-image-link',
            };
        },
        getImageProps: (image: ImageGalleryImageType) => {
            return {
                src: image.url,
                alt: '',
                className: 'gatsby-resp-image-link',
            };
        },
        getImageWrapperProps: (image: ImageGalleryImageType) => {
            return {
                href: image.url,
            };
        },

        images: images ?? [],
        showAddImageButton: !!showAddImageButton,
        getAddImageButtonProps: () => ({
            onClick: onAddImageButtonClick,
        }),
        isGatsbyImage: (image: ImageGalleryImageType) => {
            return !!image.childImageSharp;
        },
    };
};
