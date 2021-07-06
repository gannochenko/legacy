/* eslint-disable class-methods-use-this */

import React from 'react';
import BaseComponent from '../../../../../lib/base/component/component.jsx';
import User from '../../../../../api/user/entity/entity.client.js';

import './style.less';

export default class Footer extends BaseComponent
{
	render()
	{
		return (
		    <div className="footer grid-container">
		        <div className="footer__grid grid-x">
                    <div className="footer__copyright large-12 cell">
                        <span>
                            &copy; 2017&ndash;2019 &laquo;Прусское наследие&raquo;
                        </span>
                        <a href="/privacy-policy" className="rb-margin-l_x2 rb-f-color_white rb-underline_out">
                            Политика конфиденциальности
                        </a>
	                    {
	                    	!User.get()
		                    &&
                            <a href="/login" className="rb-margin-l_x2 rb-f-color_white rb-underline_out">
                                Авторизация
                            </a>
	                    }
                    </div>
		        </div>
		    </div>
		);
	}
}
