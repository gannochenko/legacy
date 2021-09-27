import React from 'react';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

import moment from 'moment';

// https://github.com/vazco/uniforms/blob/master/INTRODUCTION.md#autofield-algorithm
// https://github.com/vazco/uniforms/blob/master/API.md#connectfield
// https://github.com/vazco/uniforms/blob/master/packages/uniforms-unstyled/src/TextField.js

import RendererGeneric from '../generic';
import Container from '../container';

import DatePicker from '../../../../etc/date-picker';

import './style.less';

class RendererDate extends RendererGeneric
{
    constructor(props)
    {
        super(props);
        this.extendState({
            opened: false,
        });

        this.onCloseClick = this.onCloseClick.bind(this);
        this.onOpenClick = this.onOpenClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onCloseClick()
    {
        this.setState({
            opened: false,
        });
    }

    onOpenClick()
    {
        this.setState({
            opened: true,
        });
    }

    onChange(value)
    {
        this.setState({
            opened: false,
        });
        this.props.onChange(value);
    }

    renderSelector()
    {
        return (
            <DatePicker
                title={this.props.attribute.getTitle()}
                chosen={this.getValue()}
                opened={this.state.opened}
                onClose={this.onCloseClick}
                onChange={this.onChange}
            />
        );
    }

    // DD MMMM YYYY HH:mm:ss
    render()
    {
        return (
            <Container
                errorProps={this.props}
                {...filterDOMProps(this.props)}
            >
                <div className="date-field">
                    <div
                        className="date-field__opener"
                        onClick={this.onOpenClick}
                    >
                        <div className="date-field__display">
                            <input
                                type="text"
                                readOnly
                                value={moment(this.getValue()).format('DD MMMM YYYY')}
                            />
                            <div className="date-field__display-icon" />
                        </div>
                    </div>
                    <input
                        type="hidden"
                        name={this.getName()}
                        onChange={this.getOnChange()}
                        value={this.getValue()}
                    />
                    {this.renderSelector()}
                </div>
            </Container>
        );
    }
}

export default connectField(RendererDate, {});
