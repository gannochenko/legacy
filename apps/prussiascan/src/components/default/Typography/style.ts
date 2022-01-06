import styled from '@emotion/styled';
import { foregroundColor, MUIThemeType } from '@gannochenko/ui.emotion';
import { Typography } from '@material-ui/core';
import { TypographyRootPropsType } from './type';

const getRootDynamicStyle = ({
    enableVerticalGutter,
    variant,
    theme,
}: TypographyRootPropsType) => {
    // const { typographyGutter } = theme;
    //
    // if (enableVerticalGutter && variant && variant in typographyGutter) {
    //     return typographyGutter[variant];
    // }

    return '';
};

export const TypographyRoot = styled(Typography)<TypographyRootPropsType>`
    ${getRootDynamicStyle};
`;

export const TypographyAnchor = styled.a<{
    name: string;
    theme?: MUIThemeType;
}>`
    text-decoration: none;
    ${({ theme }) =>
        foregroundColor(
            theme?.palette.grey['600'] ?? '',
            theme?.palette.grey['800'] ?? '',
            '300ms',
        )}
`;
