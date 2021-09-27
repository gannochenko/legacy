import React from 'react';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

// https://github.com/vazco/uniforms/blob/master/INTRODUCTION.md#autofield-algorithm
// https://github.com/vazco/uniforms/blob/master/API.md#connectfield
// https://github.com/vazco/uniforms/blob/master/packages/uniforms-unstyled/src/TextField.js

import RendererGeneric from '../generic';
import Container from '../container';
import SelectBox from '../../../../etc/selectbox';

class RendererSelectBox extends RendererGeneric
{
    render()
    {
        return (
            <Container
                errorProps={this.props}
                {...filterDOMProps(this.props)}
            >
                <SelectBox
                    value={this.getValue()}
                    items={this.getAttribute().getAllowedValues()}
                    name={this.getName()}
                    multiple={this.getAttribute().isArray()}
                    onChange={this.onChange.bind(this)}
                />
            </Container>
        );
    }
}

export default connectField(RendererSelectBox, {});
