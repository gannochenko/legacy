import React, { FC } from 'react';
import { graphql } from 'gatsby';
import { SRLWrapper } from 'simple-react-lightbox';
import ReactMarkdown from 'react-markdown';

import { HeritageObjectDetailPropsType } from './type';
import { PageLayout, Container } from '../../components/default';
import { lightBoxOptions } from '../../util/lightBoxOptions';
import { useHeritageObjectDetail } from './hooks/useHeritageObjectDetail';
import { HeritageObjectDetailRoot, HeritageObjectDetailImage } from './style';

/**
 * This component is for wrapping up pages that lay in the content/ folder.
 * See gatsby-node.js for details.
 */
export const HeritageObjectDetail: FC<HeritageObjectDetailPropsType> = (
    props,
) => {
    const { rootProps, data, content, pageLayoutProps, imageProps } =
        useHeritageObjectDetail(props);

    return (
        <PageLayout {...pageLayoutProps}>
            <Container>
                <SRLWrapper options={lightBoxOptions}>
                    <HeritageObjectDetailRoot {...rootProps}>
                        <HeritageObjectDetailImage {...imageProps} />
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </HeritageObjectDetailRoot>
                </SRLWrapper>
            </Container>
        </PageLayout>
    );
};

export const HeritageObjectDetailQuery = graphql`
    query HeritageObjectDetailQuery($id: String) {
        allHeritageObject(filter: { id: { eq: $id } }) {
            nodes {
                name
                slug
                content
                previewPhoto
                previewPhotoImg {
                    childImageSharp {
                        gatsbyImageData(width: 600, layout: FIXED)
                    }
                }
            }
        }
    }
`;

export default HeritageObjectDetail;
