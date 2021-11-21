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
                nameDe
                slug
                content
                constructionYearStart
                constructionYearEnd
                lossYearStart
                lossYearEnd
                lost
                altered
                condition
                location {
                    lat
                    lng
                }
                locationArea
                locationDescription
                materials
                kind
                photos {
                    variants {
                        normalized
                    }
                    code
                    author
                    source
                    capturedYearStart
                    capturedYearEnd
                }
                previewPhoto
                previewPhotoImg {
                    childImageSharp {
                        gatsbyImageData(width: 300, layout: FIXED)
                    }
                }
                headerPhoto
                headerPhotoImg {
                    childImageSharp {
                        gatsbyImageData(width: 1000, layout: FIXED)
                    }
                }
                heritageStatus
                heritageLevel
                heritageId
            }
        }
    }
`;

export default HeritageObjectDetailTemplate;
