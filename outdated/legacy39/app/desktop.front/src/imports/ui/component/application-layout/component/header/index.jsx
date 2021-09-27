/* eslint-disable class-methods-use-this */

import React from 'react';
import BaseComponent from '../../../../../lib/base/component/component.jsx';
import PropTypes from 'prop-types';
import Menu from '../../../general/menu';

import User from '../../../../../api/user/entity/entity.client.js';

import './style.less';

export default class Header extends BaseComponent
{
    static propTypes = {
        className: PropTypes.oneOfType([
            PropTypes.string,
        ]),
        showActions: PropTypes.bool,
    };

    static defaultProps = {
        showActions: true,
    };

	render()
	{
		const acts = this.props.showActions;

	    let authorized = false;
        let user = null;
        if (acts)
        {
            authorized = User.isAuthorized();
            // if (User.isReady())
            // {
            //     user = User.get();
            // }
        }

		return (
            <div className={`header ${!acts ? 'header_auth' : ''}`}>
                <div className={`header__container grid-container ${this.props.className || ''}`}>
                    <div className="header__grid grid-x">
                        <div className={`header__brand cell medium-${acts ? 8 : 12} small-${acts ? 11 : 12} rb-content_v_center_h_left`}>
                            <a
                                href="/"
                                className="header__logo"
                            >
                                <div className="header__logo-inner" />
                            </a>
                            <div className="header__brand-text">
                                <div className="header__brand-title">
                                    Прусское Наследие
                                </div>
                                <div className="header__brand-subtitle">
                                    Реестр объектов культурного наследия Калининградской Области
                                </div>
                            </div>
                        </div>
                        {
                            acts
                            &&
                            <div className="cell medium-4 small-1 rb-align_mr">
                                <Menu
                                    items={[
                                        // {label: 'Мои объекты', url: this.putBackUrl(`/my-objects`), needAuthorized: true},
                                        {label: 'Добавить объект', url: this.putBackUrl('/view/new/basic/'), needEditor: true},
                                        {label: 'Выйти', url: '/logout', needAuthorized: true},
                                    ]}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
		);
	}
}
