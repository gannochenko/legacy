import React, { forwardRef, FC } from 'react';
import { Grid } from '@material-ui/core';

import { BlogListPropsType } from './type';
import {
    BlogListRoot,
    BlogCardImage,
    BlogCard,
    BlogCardTitle,
} from './style';
import { useBlogList } from './hooks/useBlogList';
import { fillTemplate, BLOG_DETAIL } from '../../../pathTemplates';

export const BlogList = forwardRef<HTMLDivElement, BlogListPropsType>(
    function BlogList(props, ref) {
        const { rootProps, data } = useBlogList(ref, props);

        return (
            <BlogListRoot {...rootProps}>
                <Grid container spacing={3}>
                    {data.map((item) => {
                        const itemData = item.node.frontmatter;
                        let headerImage =
                            itemData.headerImage === undefined ||
                            itemData.headerImage === ''
                                ? 0
                                : parseInt(itemData.headerImage, 10);
                        if (Number.isNaN(headerImage)) {
                            headerImage = 0;
                        }

                        const { slug, images, shortTitle } = itemData;

                        const path = fillTemplate(BLOG_DETAIL, { slug });

                        const picture = images[headerImage].image;
                        return (
                            <Grid
                                item
                                md={4}
                                sm={6}
                                xs={12}
                                key={slug}
                            >
                                <BlogCard to={path}>
                                    <BlogCardImage
                                        sizes={picture.childImageSharp.fluid}
                                    />
                                    <BlogCardTitle>
                                        {shortTitle}
                                    </BlogCardTitle>
                                </BlogCard>
                            </Grid>
                        );
                    })}
                </Grid>
            </BlogListRoot>
        );
    },
);

BlogList.defaultProps = {};
