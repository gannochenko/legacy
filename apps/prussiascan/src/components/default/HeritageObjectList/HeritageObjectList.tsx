import React, { forwardRef, FC } from 'react';
import { Grid } from '@material-ui/core';

import { HeritageObjectListPropsType } from './type';
import {
    HeritageObjectListRoot,
    BlogCardImage,
    BlogCard,
    BlogCardTitle,
} from './style';
import { useHeritageObjectList } from './hooks/useHeritageObjectList';
import { fillTemplate, HERITAGE_DETAIL } from '../../../pathTemplates';

export const HeritageObjectList = forwardRef<HTMLDivElement, HeritageObjectListPropsType>(
    function HeritageObjectList(props, ref) {
        const { rootProps, data } = useHeritageObjectList(ref, props);

        console.log(data);

        return (
            <HeritageObjectListRoot {...rootProps}>
                {/*<Grid container spacing={3}>*/}
                {/*    {data.map((item) => {*/}
                {/*        const itemData = item.node.frontmatter;*/}
                {/*        let headerImage =*/}
                {/*            itemData.headerImage === undefined ||*/}
                {/*            itemData.headerImage === ''*/}
                {/*                ? 0*/}
                {/*                : parseInt(itemData.headerImage, 10);*/}
                {/*        if (Number.isNaN(headerImage)) {*/}
                {/*            headerImage = 0;*/}
                {/*        }*/}

                {/*        const { slug, images, shortTitle } = itemData;*/}

                {/*        const path = fillTemplate(HERITAGE_DETAIL, { slug });*/}

                {/*        const picture = images[headerImage].image;*/}
                {/*        return (*/}
                {/*            <Grid*/}
                {/*                item*/}
                {/*                md={4}*/}
                {/*                sm={6}*/}
                {/*                xs={12}*/}
                {/*                key={slug}*/}
                {/*            >*/}
                {/*                <BlogCard to={path}>*/}
                {/*                    <BlogCardImage*/}
                {/*                        sizes={picture.childImageSharp.fluid}*/}
                {/*                    />*/}
                {/*                    <BlogCardTitle>*/}
                {/*                        {shortTitle}*/}
                {/*                    </BlogCardTitle>*/}
                {/*                </BlogCard>*/}
                {/*            </Grid>*/}
                {/*        );*/}
                {/*    })}*/}
                {/*</Grid>*/}
            </HeritageObjectListRoot>
        );
    },
);
