import React from 'react';
import { bool, func, object } from 'prop-types';
import { Overlay, Panel, PanelOffset, Cross, defaultTheme } from './style.js';

const Modal = class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            children: null,
        };
    }

    open = children => {
        this.setState({ open: true, children });
    };

    close = () => {
        this.setState({ open: false, children: () => {} });
    };

    openExternal = children => {
        if (this.props.active) {
            this.open(children);
        }
    };

    closeExternal = () => {
        if (this.props.active) {
            this.close();
        }
        this.props.onClose();
    };

    onOpenClick = () => {
        this.openExternal();
    };

    onCloseClick = () => {
        this.closeExternal();
    };

    render() {
        const { children, central, active, open, theme } = this.props;
        const stateChildren = this.state.children;
        if (!active && !open) {
            return null;
        }

        if (active && !this.state.open) {
            return null;
        }

        return (
            <Overlay
                central={central}
                onWheel={e => e.preventDefault()}
                theme={theme}
            >
                <Panel theme={theme}>
                    <Cross theme={theme} onClick={this.onCloseClick} />
                    <PanelOffset theme={theme}>
                        {!!stateChildren &&
                            stateChildren({ closeModal: this.onCloseClick })}
                        {!stateChildren &&
                            children({ closeModal: this.onCloseClick })}
                    </PanelOffset>
                </Panel>
            </Overlay>
        );
    }
};

Modal.propTypes = {
    active: bool, // if active is set to true, the modal controls whether it is open or not internally
    open: bool,
    onClose: func,
    central: bool,
    theme: object,
    children: func,
};

Modal.defaultProps = {
    active: false,
    open: false,
    onClose: () => {},
    central: false,
    theme: defaultTheme,
    children: () => {},
};

export default Modal;
