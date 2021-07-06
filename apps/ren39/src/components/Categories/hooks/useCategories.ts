import { Ref } from 'react';
import { CategoriesPropsType } from '../type';

import {
    BUILDING_LIST,
    BUILDING_LIST_TO_DEMOLISH,
    BUILDING_LIST_SAVED,
    BUILDING_LIST_OUTSTANDING,
    BUILDING_LIST_LOST,
} from '../../../pathTemplates';

export const useCategories = (
    ref: Ref<unknown>,
    { location, ...props }: CategoriesPropsType,
) => {
    const { pathname = BUILDING_LIST } = location || {};

    return {
        rootProps: {
            ...props, // rest props go to the root node, as before
            ref, // same for the ref
        },
        allObjectsLinkProps: {
            selected: pathname === BUILDING_LIST,
            to: BUILDING_LIST,
        },
        toDemolishObjectsLinkProps: {
            selected: pathname === BUILDING_LIST_TO_DEMOLISH,
            to: BUILDING_LIST_TO_DEMOLISH,
        },
        savedObjectsLinkProps: {
            selected: pathname === BUILDING_LIST_SAVED,
            to: BUILDING_LIST_SAVED,
        },
        outstandingObjectsLinkProps: {
            selected: pathname === BUILDING_LIST_OUTSTANDING,
            to: BUILDING_LIST_OUTSTANDING,
        },
        lostObjectsLinkProps: {
            selected: pathname === BUILDING_LIST_LOST,
            to: BUILDING_LIST_LOST,
        },
    };
};
