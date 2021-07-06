import { Ref } from 'react';
import { ReasonsPropsType } from '../type';

export const useReasons = (
    ref: Ref<unknown>,
    { resettlement, sold, text, ...props }: ReasonsPropsType,
) => {
    let link = '';
    if (resettlement) {
        link = 'https://www.klgd.ru/activity/property/rasselen/rasselen.php';
    }

    if (text) {
        link = `${link}#:~:text=${encodeURI(text)}`;
    }

    return {
        rootProps: {
            ...props, // rest props go to the root node, as before
            ref, // same for the ref
        },

        resettlement: !!resettlement,
        sold: !!sold,
        noReason: !resettlement && !sold,
        link,
    };
};
