import React from 'react';
import { bool, func } from 'prop-types';
import { Overlay, Panel, PanelOffset } from './style.js';

const Modal = ({ children, central, onClose }) => (
    <Overlay
        central={central}
        onWheel={e => e.preventDefault()}
        onClick={() => {}}
    >
        <Panel>
            <PanelOffset>{children}</PanelOffset>
        </Panel>
    </Overlay>
);

Modal.propTypes = {
    onClose: func,
    central: bool,
};

Modal.defaultProps = {
    onClose: () => {},
    central: false,
};

export default Modal;
