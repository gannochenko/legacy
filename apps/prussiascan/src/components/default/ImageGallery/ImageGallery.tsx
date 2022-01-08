import React, { forwardRef } from 'react';
import { Grid } from '@mui/material';
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
        const { rootProps, images, getImageProps, getImageWrapperProps } =
            useImageGallery(ref, props);

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
                                    <ImageGalleryImageWrapper
                                        {...getImageWrapperProps(image)}
                                    >
                                        <ImageGalleryImage
                                            {...getImageProps(image)}
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
