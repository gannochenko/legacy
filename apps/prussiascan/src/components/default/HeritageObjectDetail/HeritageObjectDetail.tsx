import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { Grid } from '@material-ui/core';

import { HeritageObjectDetailPropsType } from './type';
import {
    HeritageObjectDetailRoot,
    HeritageObjectDetailData,
    HeritageObjectDetailTitle,
    HeritageObjectDetailGerman,
    HeritageObjectDetailLocation,
    HeritageObjectDetailSummaryLine,
    HeritageObjectSummary,
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
        location,
        heritageStatusLabel,
        lostLabel,
        constructedLabel,
        conditionLabel,

        showNameDe,
        showLocation,
        showSummary,
        showHeritageStatusLabel,
        showLost,
        showConstructed,
        showAltered,
        showCondition,
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
                        {showLocation && (
                            <HeritageObjectDetailLocation>
                                {location}
                            </HeritageObjectDetailLocation>
                        )}
                        {showSummary && (
                            <HeritageObjectSummary>
                                {showHeritageStatusLabel && (
                                    <HeritageObjectDetailSummaryLine>
                                        🛡️ {heritageStatusLabel}
                                    </HeritageObjectDetailSummaryLine>
                                )}
                                {showConstructed && (
                                    <HeritageObjectDetailSummaryLine>
                                        🏗️️ {constructedLabel}
                                    </HeritageObjectDetailSummaryLine>
                                )}
                                {showAltered && (
                                    <HeritageObjectDetailSummaryLine>
                                        🔄‍️ Перестроен
                                    </HeritageObjectDetailSummaryLine>
                                )}
                                {showLost && (
                                    <HeritageObjectDetailSummaryLine>
                                        ☠️ {lostLabel}
                                    </HeritageObjectDetailSummaryLine>
                                )}
                                {showCondition && (
                                    <HeritageObjectDetailSummaryLine>
                                        {conditionLabel}
                                    </HeritageObjectDetailSummaryLine>
                                )}
                            </HeritageObjectSummary>
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
