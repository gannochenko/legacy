import { useMemo } from 'react';

import { HeritageObjectDetailPropsType } from '../type';

export const useHeritageObjectDetailTemplate = ({
    data,
    path,
    ...props
}: HeritageObjectDetailPropsType) => {
    const location = useMemo(() => ({ pathname: path ?? '' }), [path]);

    const itemData = data?.allHeritageObject?.nodes?.[0];
    const name = itemData?.name ?? '';

    return {
        rootProps: props,
        pageLayoutProps: {
            location,
            title: name ?? '',
        },
        detailPageProps: {
            data: itemData,
        },
    };
};
