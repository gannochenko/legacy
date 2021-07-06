/* eslint-disable class-methods-use-this */

// import PropTypes from 'prop-types';
import React from 'react';
// import classnames from 'classnames';
import BaseComponent from '../../../../../lib/base/component/component.jsx';
import Cookie from 'js-cookie';

import './style.less';

export default class PrivacyPolicyNotification extends BaseComponent {

    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props)
    {
        super(props);

        this.extendState({
            shown: Cookie.get('pp-n') !== '-1',
        });
    }

    componentDidMount()
    {
        super.componentDidMount();
        if (!this.getWasAccepted())
        {
	        this.notifyUser(
		        <div>
			        <div className="rb-margin-b_x">
				        <div className="rb-margin-b_x0p5">
					        Привет! Этот веб-сайт использует файлы Cookie.
				        </div>
                        До тех пор, пока вы пользуетесь нашим веб-сайтом, вы автоматически соглашаетесь с нашей <a className="rb-inline-block" href="/privacy-policy">политикой конфиденциальности и политикой Cookie.</a>
			        </div>
			        <div className="rb-group_x">
				        <a
					        className="rb-inline-block"
					        href=""
					        onClick={this.onCloseClick.bind(this)}
				        >
					        Закрыть
				        </a>
			        </div>
		        </div>,
                {
                    closeable: false,
                    code: 'privacy-policy',
                }
	        );
        }
    }

	onCloseClick()
    {
        this.setAccepted();

        // close notification
        this.notifyUser(
		    null,
		    {
			    code: 'privacy-policy',
		    }
	    );
    }

    getWasAccepted()
    {
        return Cookie.get('pp-n') === '-1';
    }

    setAccepted()
    {
	    Cookie.set('pp-n', '-1', { expires: 999999 });
    }

    render()
    {
        return null;
    }
}
