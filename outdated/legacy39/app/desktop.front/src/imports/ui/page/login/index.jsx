import React from 'react';
import BasePage from '../../../lib/base/page/page.jsx';

import {FlowRouter} from 'meteor/kadira:flow-router';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import User from '../../../api/user/entity/entity.client.js';
import LayoutCentered from '../../component/layout.centered';

import './style.less';

export default class LoginPage extends BasePage {
    constructor() {
        super();
        this.state = {
            errorMessage: null
        };
    }

    getPageTitle() {
        return 'Авторизация';
    }

    onClickLoginWithGoogle()
    {
        Meteor.loginWithGoogle({}, this.processLogin.bind(this));
    }

    onClickLoginWithFacebook() {
        Meteor.loginWithFacebook({}, this.processLogin.bind(this));
    }

    processLogin(error) {
        if (!error)
        {
            FlowRouter.go('/');
        }
        else
        {
            // todo: show in notifications
            if (error.error === 403)
            {
                this.setServerError('Login incorrect');
            }
            else
            {
                this.setServerError('Server error');
            }
        }
    }

    setServerError(message)
    {
        this.setState({
            errorMessage: _.isStringNotEmpty(message) ? message : null,
        });
    }

    render() {
        const loggedIn = User.isAuthorized();

        return (
            <LayoutCentered>
                {
                    loggedIn
                    &&
                    <div className="rb-f-size_x0p9 rb-f-color_harbor-rat">
                        Вы уже авторизованы. Вы можете <a href="/logout">выйти</a> или <a href="/">продолжить работу</a>.
                    </div>
                }
                {
                    !loggedIn
                    &&
                    <div className="rb-group_x">
                        <div
                            className="login__option login__option_google"
                            onClick={this.onClickLoginWithGoogle.bind(this)}
                        >
                            <div className="login__option-logo" />
                            <div className="login__option-text">
                                Войти через Google
                            </div>
                        </div>
                        <div
                            className="login__option login__option_facebook"
                            onClick={this.onClickLoginWithFacebook.bind(this)}
                        >
                            <div className="login__option-logo" />
                            <div className="login__option-text">
                                Войти через Facebook
                            </div>
                        </div>
                    </div>
                }
            </LayoutCentered>
        );
    }
}
