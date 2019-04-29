import React from 'react';
import { Notification } from './style.js';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
    }

    notify(message) {
        if (!_.iane(message)) {
            return;
        }

        const id = Math.floor(Math.random() * 1000000);
        message = {
            id,
            text: message.text || 'No text',
            type: message.type || '',
            closeable: message.closeable !== false,
            code: message.code,
        };

        if (message.lifeTime > 0) {
            setTimeout(() => {
                this.closeMessage(id);
            }, message.lifeTime);
        }

        this.setState({
            messages: [...this.state.messages, message],
        });
    }

    render() {
        return <Notification />;
    }
}
