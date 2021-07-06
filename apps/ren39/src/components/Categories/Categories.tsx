import React, { forwardRef, FC } from 'react';
import { Grid, Link } from '@material-ui/core';

import { CategoriesPropsType } from './type';
import { CategoriesRoot, CategoriesLink } from './style';
import { useCategories } from './hooks/useCategories';

export const Categories: FC<CategoriesPropsType> = forwardRef(
    function Categories(props, ref) {
        const {
            rootProps,
            allObjectsLinkProps,
            toDemolishObjectsLinkProps,
            savedObjectsLinkProps,
            outstandingObjectsLinkProps,
            lostObjectsLinkProps,
        } = useCategories(ref, props);

        return (
            <CategoriesRoot {...rootProps}>
                <Grid container spacing={5}>
                    <Grid item>
                        <CategoriesLink {...allObjectsLinkProps}>
                            <Link>Все объекты</Link>
                        </CategoriesLink>
                    </Grid>
                    <Grid item>
                        <CategoriesLink {...toDemolishObjectsLinkProps}>
                            <Link color="primary">Будут снесены</Link>
                        </CategoriesLink>
                    </Grid>
                    <Grid item>
                        <CategoriesLink {...savedObjectsLinkProps}>
                            <Link color="primary">Возможно, спасены</Link>
                        </CategoriesLink>
                    </Grid>
                    <Grid item>
                        <CategoriesLink {...outstandingObjectsLinkProps}>
                            <Link color="primary">Выдающиеся</Link>
                        </CategoriesLink>
                    </Grid>
                    <Grid item>
                        <CategoriesLink {...lostObjectsLinkProps}>
                            <Link color="primary">Утраченные</Link>
                        </CategoriesLink>
                    </Grid>
                </Grid>
            </CategoriesRoot>
        );
    },
);

Categories.defaultProps = {};
