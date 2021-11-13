import React, { FC } from 'react';
import { graphql } from 'gatsby';

import { HeritageObjectDetailPropsType } from './type';
import { PageLayout } from '../../components/default';
import { useHeritageObjectDetailTemplate } from './hooks/useHeritageObjectDetailTemplate';
import { HeritageObjectDetail } from '../../components/default/HeritageObjectDetail';

/**
 * This component is for wrapping up pages that lay in the content/ folder.
 * See gatsby-node.js for details.
 */
export const HeritageObjectDetailTemplate: FC<HeritageObjectDetailPropsType> = (
    props,
) => {
    const { pageLayoutProps, detailPageProps } =
        useHeritageObjectDetailTemplate(props);

    return (
        <PageLayout {...pageLayoutProps}>
            <HeritageObjectDetail {...detailPageProps} />
        </PageLayout>
    );
};

export const HeritageObjectDetailTemplateQuery = graphql`
    query HeritageObjectDetailQuery($id: String) {
        allHeritageObject(filter: { id: { eq: $id } }) {
            nodes {
                name
                slug
                content
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

export default HeritageObjectDetailTemplate;
