import { lcFirst } from 'change-case';
import { HeritageObjectDetailPropsType } from '../type';
import { heritageObjectStatusMap } from '../../../../maps/heritageObjectStatusMap';
import { ImageGalleryImageType } from '../../ImageGallery/type';
import { locationAreaMap } from '../../../../maps/locationAreaMap';
import { heritageObjectLevelMap } from '../../../../maps/heritageObjectLevelMap';
import {
    HeritageObjectConditionEnum,
    heritageObjectConditionMap,
} from '../../../../maps/heritageObjectConditionMap';
import { heritageObjectKindMap } from '../../../../maps/heritageObjectKindMap';
import { materialMap } from '../../../../maps/materialMap';
import { architectsMap } from '../../../../maps/architectsMap';

export const useHeritageObjectDetail = <E extends HTMLDivElement>({
    data,
    ...props
}: HeritageObjectDetailPropsType) => {
    const name = data?.name ?? '';
    const content = data?.content ?? '';
    const nameDe = data?.nameDe || '';
    const locationDescription = data?.locationDescription || '';

    const locationArea = data?.locationArea || '';
    let locationAreaLabel = '';
    if (locationArea && locationArea in locationAreaMap) {
        locationAreaLabel = locationAreaMap[locationArea];
    }

    const heritageStatus = data?.heritageStatus || '';
    const heritageLevel = data?.heritageLevel || '';
    const heritageId = data?.heritageId || '';
    let heritageStatusLabel = '';
    if (heritageStatus && heritageStatus in heritageObjectStatusMap) {
        heritageStatusLabel = heritageObjectStatusMap[heritageStatus];
        if (heritageStatus === 1 && heritageLevel) {
            heritageStatusLabel = `${
                heritageObjectLevelMap[heritageLevel]
            } ${lcFirst(heritageStatusLabel)}`;
        }
        if (heritageId) {
            heritageStatusLabel = `${heritageStatusLabel}, код: ${heritageId}`;
        }
    }

    let constructedLabel = '';
    const constructionYearStart = data?.constructionYearStart ?? 0;
    const constructionYearEnd = data?.constructionYearEnd ?? 0;
    if (
        constructionYearStart &&
        constructionYearEnd &&
        // @ts-ignore
        constructionYearStart !== constructionYearEnd
    ) {
        constructedLabel = `Построен между ${constructionYearStart} и ${constructionYearEnd} годами`;
    }
    if (
        constructionYearStart &&
        // @ts-ignore
        (!constructionYearEnd || constructionYearStart === constructionYearEnd)
    ) {
        constructedLabel = `Построен в ${constructionYearEnd} году`;
    }

    const lost = !!data?.lost;
    const lossYearStart = data?.lossYearStart ?? 0;
    const lossYearEnd = data?.lossYearEnd ?? 0;
    let lostLabel = '';
    if (lost) {
        lostLabel = 'Был утрачен';
        if (lossYearStart && lossYearEnd && lossYearStart !== lossYearEnd) {
            lostLabel = `${lostLabel} между ${lossYearStart} и ${lossYearEnd} годами`;
        }
        if (lossYearStart && (!lossYearEnd || lossYearStart === lossYearEnd)) {
            lostLabel = `${lostLabel} в ${lossYearStart} году`;
        }
    }

    let conditionLabel = '';
    let conditionLevelIcon = '';
    const condition = data?.condition ?? 0;
    if (condition && condition in heritageObjectConditionMap) {
        conditionLabel = heritageObjectConditionMap[condition];
        conditionLevelIcon =
            condition >= HeritageObjectConditionEnum.poor ? '🛑' : '✅';
    }

    const headerImage =
        data?.headerPhotoImage?.childImageSharp?.gatsbyImageData;

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

    let kindTags: string[] = [];
    const kind = data?.kind ?? [];
    if (kind.length) {
        kindTags = kind.map((kindItem) => heritageObjectKindMap[kindItem]);
    }

    let materialTags: string[] = [];
    const materials = data?.materials ?? [];
    if (materials.length) {
        materialTags = materials.map(
            (materialItem) => materialMap[materialItem],
        );
    }

    const architects =
        data?.architects
            ?.map((architectId) => architectsMap[architectId] ?? null)
            .filter((x) => !!x) ?? [];

    console.log(data);

    return {
        rootProps: props,
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
        location: [locationAreaLabel, locationDescription]
            .filter((x) => !!x)
            .join(', '),
        heritageStatusLabel,
        lostLabel,
        constructedLabel,
        conditionLabel,
        conditionLevelIcon,
        kindProps: {
            tags: kindTags,
        },
        materialProps: {
            tags: materialTags,
        },
        architects,
        architectsLabel: architects.length > 1 ? 'Архитекторы' : 'Архитектор',

        showNameDe: !!nameDe,
        showLocation: !!locationDescription || !!locationAreaLabel,
        showSummary: true,
        showLost: lost,
        showConstructed: !!constructedLabel,
        showHeritageStatusLabel: !!heritageStatusLabel,
        showAltered: data?.altered ?? false,
        showCondition: !lost && !!conditionLabel,
        showRemarkable: !!data?.remarkable,
        showArchitects: !!architects.length,
    };
};
