/* eslint-disable class-methods-use-this */

import React from 'react';
import BasePage from '../../../lib/base/page/page.jsx';

import User from '../../../api/user/entity/entity.client.js';
import LayoutCentered from '../../component/layout.centered';

export default class ThankYouPage extends BasePage
{
    getPageTitle()
    {
        return 'Спасибо за регистрацию';
    }

    render()
    {
        const loggedIn = User.isAuthorized();

        return (
            <LayoutCentered>
                <h1>Спасибо за регистрацию!</h1>
                <div className="rb-margin-t_x rb-f-size_x0p9 rb-f-color_harbor-rat">
                    <div className="rb-group_x0p25">
                        <div>
                            В целях безопасности ваша регистрация должна быть одобрена модератором.<br />
                            Как только это случится, вы сможете начать работу на нашем портале.
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
