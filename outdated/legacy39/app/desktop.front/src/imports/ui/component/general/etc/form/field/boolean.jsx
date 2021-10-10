import React from 'react';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

import Container from './container.jsx';

class Boolean extends React.Component
{
    onItemCheck()
    {
        this.props.onChange(!this.getValue());
    }

    getValue() {
        return this.props.value;
    }

    render()
    {
        return (
            <Container
                errorProps={this.props}
                {...filterDOMProps(this.props)}
            >
                <div
                    className={`pl-button ${this.getValue() ? '' : 'pl-button_inactive'}`}
                    onClick={this.onItemCheck.bind(this)}
                >
                    <div className="selector__item-text">
                        {this.props.label}
                    </div>
                </div>
            </Container>
        );
    }
}

export default connectField(Boolean, {});
