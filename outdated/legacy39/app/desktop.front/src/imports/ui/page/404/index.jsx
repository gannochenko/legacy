/* eslint-disable class-methods-use-this */

import React from 'react';
import BasePage from '../../../lib/base/page/page.jsx';

import LayoutCentered from '../../component/layout.centered';

export default class NotFoundPage extends BasePage
{
    getPageTitle()
    {
        return 'Страница не найдена (404)';
    }

    render()
    {
        return (
            <LayoutCentered>
                <h1>404</h1>
                <div className="">
                    Страница не найдена.
                </div>
                <div className="rb-margin-t_x rb-f-size_x0p9 rb-f-color_harbor-rat">
                    <div className="rb-group_x0p25">
                        <div>
                            Возможно, здесь раньше что-то было, но потом пришли собственники и снесли это (<s>шутки за 300</s>). Вы можете <a href="/">продолжить работу с главной страницы</a>.
                        </div>
                    </div>
                </div>
            </LayoutCentered>
        );
    }
}
