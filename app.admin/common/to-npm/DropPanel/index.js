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
        this.preventClose = false;
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
        if (!this.state.open) {
            return;
        }

        if (this.preventClose) {
            return;
        }

        let node = e.target;
        while (node) {
            if (node === this.panel.current) {
                clearTimeout(this.timer);
                this.timer = null;
                return;
            }
            node = node.parentNode;
        }

        this.closeImmediate();
    };

    onDocumentKeyPress = e => {
        if (!this.state.open) {
            return;
        }

        if (e.code === 'Escape') {
            this.closeImmediate();
        }
    };

    open(options) {
        options = options || {};
        const { preventClose } = options;

        if (preventClose) {
            this.preventClose = true;
        }

        this.setState({
            open: true,
        });
        if (preventClose) {
            setTimeout(() => {
                this.preventClose = false;
            }, 100);
        }
    }

    close() {
        this.timer = setTimeout(() => {
            this.timer = null;
            this.closeImmediate();
        }, 300);
    }

    toggle = () => {
        this.setState(state => ({
            open: !state.open,
        }));
    };

    closeImmediate() {
        this.setState({
            open: false,
        });
        if (_.isFunction(this.props.onClose)) {
            this.props.onClose();
        }
    }

    render() {
        const { children, theme, panel, openOnChildrenClick } = this.props;
        return (
            <DropPanel ref={this.panel}>
                {!!openOnChildrenClick && (
                    <div onClick={this.toggle}>{children}</div>
                )}
                {!openOnChildrenClick && children}
                <Panel theme={theme} open={this.state.open}>
                    <PanelInner theme={theme}>{panel}</PanelInner>
                </Panel>
            </DropPanel>
        );
    }
}
