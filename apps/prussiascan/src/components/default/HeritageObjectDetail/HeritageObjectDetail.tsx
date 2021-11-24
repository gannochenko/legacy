import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { Grid } from '@material-ui/core';

import { HeritageObjectDetailPropsType } from './type';
import {
    HeritageObjectDetailRoot,
    // HeritageObjectDetailImageLink,
    // HeritageObjectDetailImage,
    HeritageObjectDetailData,
    HeritageObjectDetailTitle,
    HeritageObjectDetailGerman,
    HeritageObjectDetailLocation,
    HeritageObjectDetailBadges,
} from './style';
import { useHeritageObjectDetail } from './hooks/useHeritageObjectDetail';
import { Container } from '../Container';
import { PageHeader } from '../PageHeader';
import { Map } from '../Map';
import { ImageGallery } from '../ImageGallery';

export const HeritageObjectDetail: FC<HeritageObjectDetailPropsType> = (
    props,
) => {
    const {
        rootProps,
        content,
        pageHeaderProps,
        mapProps,
        imageGalleryProps,
        name,
        nameDe,
        locationDescription,
        heritageStatusLabel,
        showNameDe,
        showLocationDescription,
        showHeritageStatusLabel,
    } = useHeritageObjectDetail(props);

    return (
        <HeritageObjectDetailRoot {...rootProps}>
            <PageHeader {...pageHeaderProps}>
                <Container tall>
                    <HeritageObjectDetailData>
                        <HeritageObjectDetailTitle>
                            {name}
                        </HeritageObjectDetailTitle>
                        {showNameDe && (
                            <HeritageObjectDetailGerman>
                                {nameDe}
                            </HeritageObjectDetailGerman>
                        )}
                        {showLocationDescription && (
                            <HeritageObjectDetailLocation>
                                {locationDescription}
                            </HeritageObjectDetailLocation>
                        )}
                        {showHeritageStatusLabel && (
                            <HeritageObjectDetailBadges>
                                🛡️ {heritageStatusLabel}
                            </HeritageObjectDetailBadges>
                        )}
                    </HeritageObjectDetailData>
                </Container>
            </PageHeader>
            <Container>
                <Grid container>
                    <Grid item xs={6}>
                        1
                    </Grid>
                    <Grid item xs={6}>
                        2
                    </Grid>
                </Grid>
                <ReactMarkdown>{content}</ReactMarkdown>
            </Container>
            <Container>
                <ImageGallery
                    {...imageGalleryProps}
                    marginTop="3rem"
                    marginBottom="3rem"
                />
            </Container>
            <Map {...mapProps} />
        </HeritageObjectDetailRoot>
    );
};
