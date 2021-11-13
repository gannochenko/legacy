import React, { FC } from 'react';
import { SRLWrapper } from 'simple-react-lightbox';

import { HeritageObjectDetailPropsType } from './type';
import {
    HeritageObjectDetailRoot,
    HeritageObjectDetailImageLink,
    HeritageObjectDetailImage,
} from './style';
import { useHeritageObjectDetail } from './hooks/useHeritageObjectDetail';
import { lightBoxOptions } from '../../../util/lightBoxOptions';
import { Container } from '../Container';
import ReactMarkdown from 'react-markdown';

export const HeritageObjectDetail: FC<HeritageObjectDetailPropsType> = (
    props,
) => {
    const { rootProps, showPhoto, content, imageProps, imageLinkProps } =
        useHeritageObjectDetail(props);

    return (
        <HeritageObjectDetailRoot {...rootProps}>
            <SRLWrapper options={lightBoxOptions}>
                <Container>
                    {showPhoto && (
                        <HeritageObjectDetailImageLink {...imageLinkProps}>
                            <HeritageObjectDetailImage {...imageProps} />
                        </HeritageObjectDetailImageLink>
                    )}
                    <ReactMarkdown>{content}</ReactMarkdown>
                </Container>
            </SRLWrapper>
        </HeritageObjectDetailRoot>
    );
};
