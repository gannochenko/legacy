import React from 'react';
import BaseComponent from '../../../../lib/base/component/component.jsx';
import PropTypes from 'prop-types';

import Header from '../component/header';
import Footer from '../component/footer';

import GlobalOverlay from '../../general/etc/global-overlay';
import GlobalLoadProgress from '../../general/etc/global-load-progress';
import PrivacyPolicyNotification from '../../general/etc/privacy-policy-notification';
// import ImageViewer from '../../general/image-viewer/index.jsx';
import Notifier from '../../general/etc/notifier';
import Modal from '../../general/etc/modal';
// import {GatewayDest} from 'react-gateway';

import Crawler from '../../../../lib/crawler.js';

import './style.less';

export default class DefaultApplicationLayout extends BaseComponent
{
    static propTypes = {
        ready: PropTypes.bool,
    };

    static defaultProps = {
        ready: false,
    };

    getRandomMessage() {
        const messages = [
            'Наливаем чашку кофе...',
            'Завязываем шнурки...',
            'Вставляем батарейки...',
            'Застегиваем молнию...',
            'Нажимаем кнопку "Пуск"...',
        ];

        return messages[_.random(0, messages.length - 1)];
    }

	isReady()
	{
		return !!this.props.ready;
	}

    render()
    {
        return (
            <div
                className="layout rb-tall grid-y"
            >
                <div className="layout__header cell">
                    <GlobalLoadProgress
                        ready={this.isReady()}
                    />
                    <Header
                        ready={this.isReady()}
                    />
                </div>

                <div className="layout__body cell menu__mobile-here">
	                {
		                this.isReady()
		                &&
		                this.props.children
	                }
                    {
                        !Crawler.isCrawler()
                        &&
                        <GlobalOverlay
                            text={this.getRandomMessage()}
                            ready={this.isReady()}
                        />
                    }
                </div>
                <div className="layout__footer cell">
                    <Footer />
                </div>
                {/*<ImageViewer />*/}

                <Notifier />
                <Modal
                    singleton
                />

                <PrivacyPolicyNotification />
            </div>
        );
    }
}
