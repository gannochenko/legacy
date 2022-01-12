import React, { forwardRef } from 'react';
import { graphql } from 'gatsby';

import { HeritageObjectListPropsType } from './type';
import { useHeritageObjectListTemplate } from './hooks/useHeritageObjectListTemplate';
import { PageLayout, Container, PageOffset } from '../../components/default';
import { HeritageObjectList } from '../../components/default/HeritageObjectList/HeritageObjectList';

export const HeritageObjectListTemplate = forwardRef<
    HTMLDivElement,
    HeritageObjectListPropsType
>(function HeritageObjectListTemplate(props, ref) {
    const { pageLayoutProps, objectListProps } = useHeritageObjectListTemplate(
        ref,
        props,
    );

    return (
        <PageLayout {...pageLayoutProps}>
            <Container>
                <HeritageObjectList {...objectListProps} />
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

export default HeritageObjectListTemplate;
