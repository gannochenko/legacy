/* eslint-disable class-methods-use-this */

import React from 'react';
import BasePage from '../../../lib/base/page/page.jsx';

import User from '../../../api/user/entity/entity.client.js';
import LayoutCentered from '../../component/layout.centered';

export default class ForbiddenPage extends BasePage
{
    getPageTitle()
    {
        return 'Доступ запрещен (403)';
    }

    render()
    {
        const loggedIn = User.isAuthorized();

        return (
            <LayoutCentered>
                <h1>403</h1>
                <div className="">
                    Доступ запрещен.
                </div>
                <div className="rb-margin-t_x rb-f-size_x0p9 rb-f-color_harbor-rat">
                    <div className="rb-group_x0p25">
                        <div>
                            Воу воу, приятель, это частная территория! Вы можете <a href="/">продолжить работу с главной страницы</a>.
                        </div>
                        {
                            loggedIn
                            &&
                            <div>
                                Вы также можете <a href="/logout">сменить пользователя</a>.
                            </div>
                        }
                    </div>
                </div>
            </LayoutCentered>
        );
    }
}
