import React, { FC } from 'react';
import { Chip } from '@material-ui/core';

import { TagCloudPropsType } from './type';
import { TagCloudRoot } from './style';
import { useTagCloud } from './hooks/useTagCloud';

export const TagCloud: FC<TagCloudPropsType> = (props) => {
    const { rootProps, tags } = useTagCloud(props);

    return (
        <TagCloudRoot {...rootProps}>
            {tags.map((tag) => (
                <Chip label={tag} key={tag} />
            ))}
        </TagCloudRoot>
    );
};
