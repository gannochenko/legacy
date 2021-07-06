import { BuildingEdgeType } from '../../../type';

export const extractImageMiniature = (edge: BuildingEdgeType) => {
    const imageSrcSet =
        // @ts-ignore
        edge?.node?.frontmatter?.images[0]?.image?.childImageSharp?.fluid
            ?.srcSet;

    if (!imageSrcSet) {
        return null;
    }

    const sizes = imageSrcSet.split(',');
    if (sizes[0]) {
        const parts = sizes[0].split(' ');

        return parts[0];
    }

    return null;
};
