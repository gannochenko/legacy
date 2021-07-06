import React from 'react';
import PropTypes from 'prop-types';

import BaseComponent from '../../../lib/base/component/component.jsx';
import Header from '../application-layout/component/header/index.jsx';

export default class LayoutCentered extends BaseComponent {

    static propTypes = {
        className: PropTypes.oneOfType([
            PropTypes.string,
        ]),
    };

    static defaultProps = {
        className: '',
    };

    render() {
        return (
            <div className={`layout rb-content_v_center_h_center rb-h_100p ${this.props.className}`}>
                <div className="rb-padding-lr_x">
                    <Header
                        className="rb-no-padding"
                        showActions={false}
                    />
                    <div className="rb-margin-t_x2">
                        {this.props.children || null}
                    </div>
                </div>
            </div>
        );
    }
}
