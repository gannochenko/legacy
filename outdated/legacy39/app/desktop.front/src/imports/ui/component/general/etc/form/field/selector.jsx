import React from 'react';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import Selector from '../../selector';
import Container from './container.jsx';

class SelectorField extends React.Component
{
    getName()
    {
        return this.props.name;
    }

    getValue()
    {
        return this.props.value;
    }

    render()
    {
        return (
            <Container
                label={this.props.label}
                errorProps={this.props}
                {...filterDOMProps(this.props)}
            >
                <Selector
                    value={this.getValue()}
                    name={this.getName()}
                    items={this.props.items}
                    multiple={this.props.multiple}
                    onChange={this.props.onChange}
                />
            </Container>
        );
    }
}

export default connectField(SelectorField, {});
