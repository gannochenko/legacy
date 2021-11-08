import React, { FC, useMemo } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { SRLWrapper } from 'simple-react-lightbox';

import { BlogDetailPropsType } from './type';
import { PageLayout } from '../../components/default/PageLayout';
import { lightBoxOptions } from '../../util/lightBoxOptions';

/**
 * This component is for wrapping up pages that lay in the content/ folder.
 * See gatsby-node.js for details.
 */
export const BlogDetail: FC<BlogDetailPropsType> = ({
    data: { mdx },
    path,
}) => {
    const location = useMemo(() => ({ pathname: path }), [path]);

    return (
        <PageLayout pageContext={mdx} location={location}>
            <SRLWrapper options={lightBoxOptions}>
                <MDXRenderer pageContext={mdx}>{mdx.body}</MDXRenderer>
            </SRLWrapper>
        </PageLayout>
    );
};

// export const BlogDetailQuery = graphql`
//     query BlogDetailQuery($id: String) {
//         mdx(id: { eq: $id }) {
//             id
//             body
//             frontmatter {
//                 title
//                 keywords
//                 description
//                 displayPageTitle
//                 images {
//                     image {
//                         childImageSharp {
//                             fluid(maxWidth: 1240, quality: 80) {
//                                 ...GatsbyImageSharpFluid_tracedSVG
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `;

export default BlogDetail;
