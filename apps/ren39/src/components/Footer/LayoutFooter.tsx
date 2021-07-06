import React, { FC } from 'react';
import {
    FooterRoot,
    FooterInfo,
    FooterNoWrap,
    CICDLink,
    AnalyticsLink,
} from './style';
import { Link } from '../Link';

export const LayoutFooter: FC = () => {
    return (
        <FooterRoot>
            <FooterInfo>
                Разработка сайта и текст:{' '}
                <Link to="https://www.instagram.com/gannochenko_arch/" inner>
                    Ганноченко Сергей
                </Link>
                , фотографии и текст: Королева Анна
            </FooterInfo>
            <FooterInfo>
                <FooterNoWrap>&copy; 2021</FooterNoWrap> &bull;{' '}
                <Link to="/cookie" inner>
                    Как мы используем Cookies
                </Link>
            </FooterInfo>
            <CICDLink
                href="https://vercel.com/gannochenko/ren39/deployments"
                rel="noreferrer noopener nofollow"
                target="_blank"
            />
            <AnalyticsLink
                href="https://analytics.google.com/analytics/web/?authuser=1#/p264445582/realtime/overview"
                rel="noreferrer noopener nofollow"
                target="_blank"
            />
        </FooterRoot>
    );
};
