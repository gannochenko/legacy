import React from 'react';
import PropTypes from 'prop-types';

import BaseComponent from '../../../../../lib/base/component/component.jsx';
import './style.less';

export default class Notifier extends BaseComponent {
    static propTypes = {
        className: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.object,
        ]),
    };

    static defaultProps = {
        className: '',
    };

    constructor(props) {
        super(props);
        this.extendState({
            display: [],
        });

        this._messageHeights = {};
        this._display = [];
    }

    componentDidMount()
    {
        super.componentDidMount();
        this.on('notification-show', this.onNotificationShow.bind(this));
    }

    onNotificationShow(message)
    {
        if (_.isObjectNotEmpty(message))
        {
            if (_.isStringNotEmpty(message.code))
            {
	            this.closeMessagesByCode(message.code);
            }

            if (message.text)
            {
	            this.createMessage(message);
            }
        }
    }

    onMessageCloseClick(id)
    {
        this.closeMessage(id);
    }

    createMessage(message)
    {
        const display = this._display;

        const id = _.random(100000, 999999);
        display.push({
            id,
            text: message.text || 'No text',
            type: message.type || '',
            closeable: message.closeable !== false,
            code: message.code,
        });

        this.setDisplay(display);

        if (message.lifeTime > 0)
        {
            setTimeout(() => {
                this.closeMessage(id);
            }, message.lifeTime);
        }
    }

    closeMessagesByCode(code)
    {
        const items = _.pluck(this._display.filter(item => item.code === code), 'id');
        if (_.isArrayNotEmpty(items))
        {
            items.forEach((id) => {
                this.closeMessage(id);
            });
        }
    }

    closeMessage(id)
    {
        const display = this._display;
        const item = display.find(item => item.id === id);

        if (item)
        {
            let heightNode = this._messageHeights[id];
            if (heightNode)
            {
                heightNode = $(heightNode);
                // lock the height of the element to let the animation know it
                heightNode.height(heightNode.height());
            }

            setTimeout(() => {
                this.removeMessage(id);
            }, 400);

            item.closing = true;
            this.setDisplay(display);
        }
    }

    removeMessage(id)
    {
        this._display = this._display.filter(item => item.id !== id);
        this.setDisplay(this._display);

        delete this._messageHeights[id];
    }

    setDisplay(display)
    {
        this.setState({display: _.deepClone(display)});
    }

    render() {
        return (
            <div className={`${this.props.className} notifier`}>
                {this.state.display.map((item) => {
                    return (
                        <div
                            className={`notifier__message ${item.closing ? 'notifier__message_closing' : ''}`}
                            key={item.id}
                            ref={(ref) => { this._messageHeights[item.id] = ref; }}
                        >
                            <div
                                className="notifier__message-padding"
                            >
                                <div
                                    className={`notifier__message-layout ${item.closeable ? 'notifier__message_closeable' : ''} ${_.isStringNotEmpty(item.type) ? `notifier__message_${item.type}` : ''}`}
                                >
                                    <div className="notifier__message-text">
                                        {item.text}
                                    </div>
                                    {
                                        item.closeable
                                        &&
                                        <div
                                            onClick={this.onMessageCloseClick.bind(this, item.id)}
                                            className="notifier__message-close"
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
