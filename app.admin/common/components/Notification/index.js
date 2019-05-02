import React from 'react';
import {
    Notification,
    Message,
    MessageGap,
    MessageWrap,
    Text,
    Close,
} from './style.js';

export default class extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     messages: [],
        // };

        this._messageHeights = {};
        this._messages = [];
    }

    notify(message) {
        if (_.isne(message)) {
            message = {
                text: message,
                type: 'info',
            };
        }

        if (!_.ione(message) || !_.isne(message.text)) {
            return;
        }

        if (_.isne(message.code)) {
            this.closeMessagesByCode(message.code);
        }

        const id = Math.floor(Math.random() * 1000000);
        message = {
            id,
            text: message.text,
            type: message.type || '',
            closeable: message.closeable !== false,
            closing: false,
            code: message.code,
            lifeTime: message.lifeTime || 0,
        };

        if (message.lifeTime > 0) {
            setTimeout(() => {
                this.closeMessage(id);
            }, message.lifeTime);
        }

        this._messages.push(message);

        this.forceUpdate();
    }

    closeMessage(id) {
        const message = this._messages.find(item => item.id === id);

        if (message) {
            let heightNode = this._messageHeights[id];
            if (heightNode) {
                // lock the height of the element to let the animation know it
                heightNode.style.height = `${heightNode.offsetHeight}px`;
            }

            setTimeout(() => {
                this.removeMessage(id);
            }, 500);

            message.closing = true;

            this.forceUpdate();
        }
    }

    closeMessagesByCode(code) {
        this._messages
            .filter(message => message.code === code)
            .forEach(message => {
                this.closeMessage(message.id);
            });
    }

    removeMessage(id) {
        this._messages = this._messages.filter(message => message.id !== id);
        delete this._messageHeights[id];
        this.forceUpdate();
    }

    render() {
        const { theme } = this.props;
        return (
            <Notification>
                {this._messages.map(message => (
                    <MessageWrap
                        key={message.id}
                        ref={ref => {
                            this._messageHeights[message.id] = ref;
                        }}
                        closing={message.closing}
                        theme={theme}
                    >
                        <MessageGap theme={theme}>
                            <Message theme={theme}>
                                <Text type={message.type} theme={theme}>
                                    {message.text}
                                </Text>
                                {message.closeable && (
                                    <Close
                                        onClick={() =>
                                            this.closeMessage(message.id)
                                        }
                                        theme={theme}
                                    />
                                )}
                            </Message>
                        </MessageGap>
                    </MessageWrap>
                ))}
            </Notification>
        );
    }
}
