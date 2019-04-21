/**
 * todo: apply effects on show/hide, open "up" if there is no room at the bottom
 */

import React, { Component } from 'react';
import { DropPanel, Panel, PanelInner } from './style.js';

export default class extends Component {
    constructor(props = {}) {
        super();
        this.state = {
            open: !!props.open,
        };
        this.panel = React.createRef();
    }

    componentDidMount() {
        if (!this.props.disableEvents) {
            window.addEventListener('click', this.onDocumentClick);
            window.addEventListener('keydown', this.onDocumentKeyPress);
        }
    }

    componentWillUnmount() {
        if (!this.props.disableEvents) {
            window.removeEventListener('click', this.onDocumentClick);
            window.removeEventListener('keydown', this.onDocumentKeyPress);
        }
    }

    onDocumentClick = e => {
        let node = e.target;
        while (node) {
            if (node === this.panel.current) {
                clearTimeout(this.timer);
                this.timer = null;
                return;
            }
            node = node.parentNode;
        }

        this.setState({
            open: false,
        });
    };

    onDocumentKeyPress = e => {
        if (e.code === 'Escape') {
            this.setState({
                open: false,
            });
        }
    };

    open(e) {
        this.setState({
            open: true,
        });
        if (e) {
            e.stopPropagation();
        }
    }

    close() {
        this.timer = setTimeout(() => {
            this.timer = null;
            this.setState({
                open: false,
            });
        }, 300);
    }

    closeImmediate() {
        this.setState({
            open: false,
        });
    }

    render() {
        const { children, theme, panel } = this.props;
        return (
            <DropPanel ref={this.panel}>
                {children}
                <Panel theme={theme} open={this.state.open}>
                    <PanelInner theme={theme}>{panel}</PanelInner>
                </Panel>
            </DropPanel>
        );
    }
}
