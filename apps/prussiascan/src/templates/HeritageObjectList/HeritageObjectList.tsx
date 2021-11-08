import React, { forwardRef } from 'react';
import { Grid } from '@material-ui/core';
import { graphql } from 'gatsby';

import { HeritageObjectListPropsType } from './type';
import {
    HeritageObjectListRoot,
    BlogCardImage,
    BlogCard,
    BlogCardTitle,
} from './style';
import { useHeritageObjectList } from './hooks/useHeritageObjectList';
import { fillTemplate, HERITAGE_DETAIL } from '../../pathTemplates';
import { PageLayout, Container, PageOffset } from '../../components/default';

export const HeritageObjectList = forwardRef<
    HTMLDivElement,
    HeritageObjectListPropsType
>(function HeritageObjectList(props, ref) {
    const { rootProps, data, pageLayoutProps } = useHeritageObjectList(
        ref,
        props,
    );

    return (
        <PageLayout {...pageLayoutProps}>
            <Container>
                <HeritageObjectListRoot {...rootProps}>
                    <br />
                    <Grid container spacing={3}>
                        {data.map((item) => {
                            const { slug, name, previewPhotoImg } = item;
                            const path = fillTemplate(HERITAGE_DETAIL, {
                                slug,
                            });

                            return (
                                <Grid item md={4} sm={6} xs={12} key={slug}>
                                    <BlogCard to={path}>
                                        {!!previewPhotoImg && (
                                            <BlogCardImage
                                                image={
                                                    previewPhotoImg
                                                        .childImageSharp
                                                        .gatsbyImageData
                                                }
                                                alt={name}
                                            />
                                        )}
                                        <BlogCardTitle>{name}</BlogCardTitle>
                                    </BlogCard>
                                </Grid>
                            );
                        })}
                    </Grid>
                </HeritageObjectListRoot>
            </Container>
            <PageOffset />
        </PageLayout>
    );
});

export const heritageObjectListQuery = graphql`
    query HeritageObjectIndexQuery($skip: Int!, $limit: Int!) {
        allHeritageObject(
            sort: { fields: [name], order: ASC }
            limit: $limit
            skip: $skip
        ) {
            nodes {
                name
                slug
                previewPhoto
                previewPhotoImg {
                    childImageSharp {
                        gatsbyImageData(width: 300, layout: FIXED)
                    }
                }
            }
        }
    }
`;

export default HeritageObjectList;
