import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';

import { HeritageObjectDetailPropsType } from './type';
import {
    HeritageObjectDetailRoot,
    HeritageObjectDetailData,
    HeritageObjectDetailTitle,
    HeritageObjectDetailGerman,
    HeritageObjectDetailLocation,
    HeritageObjectDetailSummaryLine,
    HeritageObjectSummary,
    HeritageObjectDetailLayout,
    HeritageObjectDetailLayoutCentral,
    HeritageObjectDetailLayoutSide,
} from './style';
import { useHeritageObjectDetail } from './hooks/useHeritageObjectDetail';
import { Container } from '../Container';
import { PageHeader } from '../PageHeader';
import { Map } from '../Map';
import { ImageGallery } from '../ImageGallery';
import { TagCloud } from '../TagCloud';

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
        conditionLevelIcon,

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
                                        {conditionLevelIcon} {conditionLabel}
                                    </HeritageObjectDetailSummaryLine>
                                )}
                            </HeritageObjectSummary>
                        )}
                    </HeritageObjectDetailData>
                </Container>
            </PageHeader>
            <Container>
                <HeritageObjectDetailLayout>
                    <HeritageObjectDetailLayoutCentral>
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </HeritageObjectDetailLayoutCentral>
                    <HeritageObjectDetailLayoutSide>
                        <TagCloud />
                    </HeritageObjectDetailLayoutSide>
                </HeritageObjectDetailLayout>
            </Container>
            <Container>
                <ImageGallery
                    {...imageGalleryProps}
                    marginTop="5rem"
                    marginBottom="3rem"
                />
            </Container>
            <Map {...mapProps} />
        </HeritageObjectDetailRoot>
    );
};
