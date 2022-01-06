import styled from '@emotion/styled';
import { Button } from '@material-ui/core';
import {
    muiTypography,
    muiColor,
    muiSpacing,
    backgroundCover,
    absoluteCover,
    contentAlignment,
    muiBreakpointDown,
    MUIThemeType,
} from '@gannochenko/ui.emotion';

// @ts-ignore
import cookies from '../../../../static/assets/aux/cookies.jpg';

export const CookiePopupRoot = styled.div<{
    fadingAway: boolean;
    theme?: MUIThemeType;
}>`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    position: fixed;
    bottom: ${muiSpacing(5)};
    background-color: ${muiColor('background.default')};
    border-bottom-left-radius: 2px;
    border-top-left-radius: 2px;
    overflow: hidden;
    box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.1);
    right: ${({ fadingAway }) => (!fadingAway ? 0 : '-1rem')};
    opacity: ${({ fadingAway }) => (!fadingAway ? 1 : 0)};
    transition: right 500ms ease, opacity 500ms ease;
`;

export const CookiePopupPicture = styled.div`
    ${backgroundCover(cookies)};
    width: ${muiSpacing(30)};
    ${muiBreakpointDown('sm')} {
        display: none;
    }
    position: relative;
    &:hover > * {
        opacity: 1;
    }
`;

export const CookiePopupText = styled.div`
    padding: ${muiSpacing(2)} ${muiSpacing(4)};
    ${muiTypography('body2')};
    position: relative;
`;

export const CookiePopupAgreeButton = styled(Button)`
    position: absolute;
    right: ${muiSpacing(4)};
    bottom: ${muiSpacing(2)};
    ${muiBreakpointDown('sm')} {
        display: none;
    }
`;

export const CookiePopupAgreeButtonXS = styled(Button)`
    display: none;
    margin-top: ${muiSpacing(4)};
    ${muiBreakpointDown('sm')} {
        display: block;
    }
`;

export const CookiePopupCopyright = styled.div`
    opacity: 0;
    ${absoluteCover()};
    color: ${muiColor('secondary.main')};
    background-color: ${muiColor('background.default')};
    ${muiTypography('micro')};
    ${contentAlignment('center', 'center', 'column')};
    transition: opacity 200ms ease;
`;
