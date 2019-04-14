/**
 * todo: apply effects on show/hide, open "up" if there is no room at the bottom
 */

import React, { Component } from 'react';
import { DropPanel, Panel, PanelInner } from './style.js';

export default class extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
        };
        this.panel = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('click', this.onDocumentClick);
        window.addEventListener('keydown', this.onDocumentKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onDocumentClick);
        window.removeEventListener('keydown', this.onDocumentKeyPress);
    }

    onDocumentClick = e => {
        let node = e.target;
        while (node) {
            if (node === this.panel.current) {
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

    open() {
        this.setState({
            open: true,
        });
    }

    close() {
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
                    <PanelInner>{panel}</PanelInner>
                </Panel>
            </DropPanel>
        );
    }
}
