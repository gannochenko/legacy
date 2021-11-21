import React, { FC } from 'react';
import { SRLWrapper } from 'simple-react-lightbox';
import ReactMarkdown from 'react-markdown';
import { Grid } from '@material-ui/core';

import { HeritageObjectDetailPropsType } from './type';
import {
    HeritageObjectDetailRoot,
    HeritageObjectDetailImageLink,
    HeritageObjectDetailImage,
    HeritageObjectDetailData,
    HeritageObjectDetailTitle,
    HeritageObjectDetailGerman,
    HeritageObjectDetailLocation,
    HeritageObjectDetailBadges,
} from './style';
import { useHeritageObjectDetail } from './hooks/useHeritageObjectDetail';
import { lightBoxOptions } from '../../../util/lightBoxOptions';
import { Container } from '../Container';
import { PageHeader } from '../PageHeader';
import { Map } from '../Map';

export const HeritageObjectDetail: FC<HeritageObjectDetailPropsType> = (
    props,
) => {
    const {
        rootProps,
        showPhoto,
        content,
        imageLinkProps,
        pageHeaderProps,
        imageProps,
        mapProps,
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
            <SRLWrapper options={lightBoxOptions}>
                <Container>
                    <Grid container>
                        <Grid item xs={6}>
                            1
                        </Grid>
                        <Grid item xs={6}>
                            {showPhoto && (
                                <HeritageObjectDetailImageLink
                                    {...imageLinkProps}
                                >
                                    {/* @ts-ignore */}
                                    <HeritageObjectDetailImage
                                        {...imageProps}
                                    />
                                </HeritageObjectDetailImageLink>
                            )}
                        </Grid>
                    </Grid>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </Container>
                <Map {...mapProps} />
            </SRLWrapper>
        </HeritageObjectDetailRoot>
    );
};
