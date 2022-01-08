import React, { forwardRef } from 'react';
import { Grid, Pagination } from '@mui/material';
import { graphql } from 'gatsby';

import { HeritageObjectListPropsType } from './type';
import {
    HeritageObjectListRoot,
    HeritageObjectListItemImage,
    HeritageObjectListItem,
    HeritageObjectListItemName,
    HeritageObjectListNext,
} from './style';
import { useHeritageObjectList } from './hooks/useHeritageObjectList';
import { fillTemplate, HERITAGE_DETAIL } from '../../pathTemplates';
import { PageLayout, Container, PageOffset } from '../../components/default';

export const HeritageObjectList = forwardRef<
    HTMLDivElement,
    HeritageObjectListPropsType
>(function HeritageObjectList(props, ref) {
    const { rootProps, data, pageLayoutProps, paginationProps, nextPageProps } =
        useHeritageObjectList(ref, props);

    return (
        <PageLayout {...pageLayoutProps}>
            <Container>
                <HeritageObjectListRoot {...rootProps}>
                    <br />
                    <Grid container spacing={3}>
                        {data.map((item) => {
                            const { slug, name, previewPhotoImage } = item;
                            const path = fillTemplate(HERITAGE_DETAIL, {
                                slug,
                            });

                            return (
                                <Grid item md={4} sm={6} xs={12} key={slug}>
                                    <HeritageObjectListItem to={path}>
                                        {!!previewPhotoImage && (
                                            <HeritageObjectListItemImage
                                                image={
                                                    previewPhotoImage
                                                        .childImageSharp
                                                        .gatsbyImageData
                                                }
                                                alt={name}
                                            />
                                        )}
                                        <HeritageObjectListItemName>
                                            {name}
                                        </HeritageObjectListItemName>
                                    </HeritageObjectListItem>
                                </Grid>
                            );
                        })}
                        <Grid item md={4} sm={6} xs={12}>
                            <HeritageObjectListNext {...nextPageProps} />
                        </Grid>
                    </Grid>
                    <br />
                    <Pagination {...paginationProps} />
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
                previewPhotoImage {
                    childImageSharp {
                        gatsbyImageData(width: 500, layout: FIXED)
                    }
                }
            }
        }
    }
`;

export default HeritageObjectList;
