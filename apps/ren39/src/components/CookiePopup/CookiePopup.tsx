import React, { FC, useCallback, useState } from 'react';

import {
    CookiePopupRoot,
    CookiePopupText,
    CookiePopupAgreeButton,
    CookiePopupAgreeButtonXS,
} from './style';
import { CookiePopupPropsType } from './type';
import { Link } from '../Link';

export const CookiePopup: FC<CookiePopupPropsType> = () => {
    const [displayed, setDisplayed] = useState(
        typeof window === 'undefined'
            ? false
            : !window.localStorage.getItem('cookie-accept'),
    );

    const [fadingAway, setFadingAway] = useState(false);

    const onAcceptClick = useCallback(() => {
        if (typeof window === 'undefined') {
            return;
        }

        window.localStorage.setItem('cookie-accept', '1');
        setFadingAway(true);
        setTimeout(() => setDisplayed(false), 600);
    }, []);

    if (!displayed) {
        return null;
    }

    return (
        <CookiePopupRoot fadingAway={fadingAway}>
            <CookiePopupText>
                Мы используем <b>cookie</b> для того, чтобы сделать вашу работу
                с нашим сайтом эффективнее.
                <br />
                Если вы используете наш сайт, вы автоматически
                <br />
                принимаете также наши{' '}
                <Link to="/cookie">условия использования cookie</Link>.
                <CookiePopupAgreeButton onClick={onAcceptClick}>
                    Понятно!
                </CookiePopupAgreeButton>
                <div>
                    <CookiePopupAgreeButtonXS onClick={onAcceptClick}>
                        Понятно!
                    </CookiePopupAgreeButtonXS>
                </div>
            </CookiePopupText>
        </CookiePopupRoot>
    );
};
