import { HeritageObjectDetailPropsType } from '../type';

export const useHeritageObjectDetailTemplate = ({
    data,
    ...props
}: HeritageObjectDetailPropsType) => {
    const itemData = data?.allHeritageObject?.nodes?.[0];

    return {
        rootProps: props,
        pageLayoutProps: {
            title: itemData?.name ?? '',
        },
        detailPageProps: {
            data: itemData,
        },
    };
};
