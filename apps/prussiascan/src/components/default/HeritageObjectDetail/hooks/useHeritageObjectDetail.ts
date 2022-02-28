import { useQuery } from 'react-query';
import { HeritageObjectDetailPropsType } from '../type';
import { useDataProcess } from './useDataProcess';
import { useEvents } from './useEvents';
import { getObject } from '../../../../services/HeritageObject/heritageObject';

export const useHeritageObjectDetail = <E extends HTMLDivElement>(
    props: HeritageObjectDetailPropsType,
) => {
    const { data } = props;
    const objectId = data?.id || '';

    const {
        data: newData,
        isSuccess,
        isLoading,
        refetch,
    } = useQuery(`data-${objectId}`, () => getObject(objectId), {
        cacheTime: 0,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retryOnMount: false,
    });

    console.log('newData');
    console.log(newData);

    const {
        content,
        headerImage,
        name,
        galleryImages,
        nameDe,
        locationAreaLabel,
        locationDescription,
        heritageStatusLabel,
        lostLabel,
        constructedLabel,
        conditionLabel,
        conditionLevelIcon,
        kindTags,
        materialTags,
        architects,
        architectsLabel,
        lost,
        id,
        location,
    } = useDataProcess(props, data);

    useEvents({
        reload: refetch,
    });

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
        name,
        nameDe,
        location,
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
        architectsLabel,
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
        objectEditorButtonsProps: {
            objectId: id,
            data,
        },
    };
};
