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
import { Grid } from '@material-ui/core';
import { PageHeader } from '../PageHeader';

export const HeritageObjectDetail: FC<HeritageObjectDetailPropsType> = (
    props,
) => {
    const {
        rootProps,
        showPhoto,
        content,
        imageLinkProps,
        pageHeaderProps,
        imageProps,
        name,
    } = useHeritageObjectDetail(props);

    return (
        <HeritageObjectDetailRoot {...rootProps}>
            <SRLWrapper options={lightBoxOptions}>
                <PageHeader {...pageHeaderProps}>
                    <Container tall>
                        <h1>{name}</h1>
                    </Container>
                </PageHeader>
                <Container>
                    <Grid container>
                        <Grid item xs={6}>
                            1
                        </Grid>
                        <Grid item xs={6}>
                            {showPhoto && (
                                <HeritageObjectDetailImageLink
                                    {...imageLinkProps}
                                >
                                    {/* @ts-ignore */}
                                    <HeritageObjectDetailImage
                                        {...imageProps}
                                    />
                                </HeritageObjectDetailImageLink>
                            )}
                        </Grid>
                    </Grid>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </Container>
            </SRLWrapper>
        </HeritageObjectDetailRoot>
    );
};
