import React from 'react';
import { Notification, Message, MessagePadding, Text, Close } from './style.js';

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
                heightNode.style.height = heightNode.offsetHeight;
            }

            setTimeout(() => {
                this.removeMessage(id);
            }, 400);

            message.closing = true;

            this.forceUpdate();
        }
    }

    closeMessagesByCode() {
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
        return (
            <Notification>
                {this._messages.map(message => (
                    <Message
                        closing={message.closing}
                        key={message.id}
                        ref={ref => {
                            this._messageHeights[message.id] = ref;
                        }}
                    >
                        <MessagePadding>
                            <Text type={message.type}>{message.text}</Text>
                            {message.closeable && (
                                <Close
                                    onClick={() =>
                                        this.closeMessage(message.id)
                                    }
                                />
                            )}
                        </MessagePadding>
                    </Message>
                ))}
            </Notification>
        );
    }
}
