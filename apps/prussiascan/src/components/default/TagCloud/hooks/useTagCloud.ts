import { uniq } from 'lodash';
import { TagCloudPropsType } from '../type';

export const useTagCloud = <E extends HTMLDivElement>({
    tags,
    ...props
}: TagCloudPropsType) => {
    const safeTags = uniq(tags ?? []);

    return {
        rootProps: {
            ...props, // rest props go to the root node, as before
        },
        tags: safeTags,
    };
};
