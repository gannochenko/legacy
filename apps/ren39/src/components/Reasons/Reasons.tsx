import React, { forwardRef, FC } from 'react';

import { Link } from '../Link';
import { ReasonsPropsType } from './type';
import { ReasonsRoot } from './style';
import { useReasons } from './hooks/useReasons';

export const Reasons: FC<ReasonsPropsType> = forwardRef(function Reasons(
    props,
    ref,
) {
    const { rootProps, noReason, resettlement, sold, link } = useReasons(
        ref,
        props,
    );

    if (noReason) {
        return null;
    }

    return (
        <ReasonsRoot {...rootProps}>
            Причина сноса:{' '}
            {resettlement && <Link to={link}>расселение по аварийности</Link>}
            {sold && <span>продажа участка под застройку</span>}.
        </ReasonsRoot>
    );
});

Reasons.defaultProps = {};
