import React, { forwardRef } from 'react';
import { Grid } from '@material-ui/core';
import { SRLWrapper } from 'simple-react-lightbox';

import { ImageGalleryPropsType } from './type';
import {
    ImageGalleryRoot,
    ImageGalleryImageWrapper,
    ImageGalleryImage,
} from './style';
import { useImageGallery } from './hooks/useImageGallery';
import { lightBoxOptions } from '../../../util/lightBoxOptions';

export const ImageGallery = forwardRef<HTMLDivElement, ImageGalleryPropsType>(
    function ImageGallery(props, ref) {
        const { rootProps, images, getImageProps } = useImageGallery(
            ref,
            props,
        );

        return (
            <ImageGalleryRoot {...rootProps}>
                <SRLWrapper options={lightBoxOptions}>
                    <Grid container spacing={3}>
                        {images.map((image, index) => {
                            if (!image) {
                                return null;
                            }

                            return (
                                <Grid item md={4} sm={6} xs={12} key={index}>
                                    <ImageGalleryImageWrapper>
                                        <ImageGalleryImage
                                            {...getImageProps(image)}
                                            className="gatsby-resp-image-link"
                                        />
                                    </ImageGalleryImageWrapper>
                                </Grid>
                            );
                        })}
                    </Grid>
                </SRLWrapper>
            </ImageGalleryRoot>
        );
    },
);

ImageGallery.defaultProps = {};
