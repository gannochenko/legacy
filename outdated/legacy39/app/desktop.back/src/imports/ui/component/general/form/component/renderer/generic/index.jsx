import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../../../../../../../lib/base/component/component.jsx';

// https://github.com/vazco/uniforms/blob/master/INTRODUCTION.md#autofield-algorithm
// https://github.com/vazco/uniforms/blob/master/API.md#connectfield
// https://github.com/vazco/uniforms/blob/master/packages/uniforms-unstyled/src/TextField.js

/**
 * @abstract
 */
export default class RendererGeneric extends BaseComponent
{
    static propTypes = {
        form: PropTypes.object.isRequired,
        row: PropTypes.object.isRequired,
        map: PropTypes.object.isRequired,
    };

    static defaultProps = {
        form: null,
        row: null,
        map: null,
    };

    getForm()
    {
        return this.props.form || null;
    }

    getRow()
    {
        return this.props.row || null;
    }

    getAttribute()
    {
        return this.props.attribute || null;
    }

    getName()
    {
        if(_.isStringNotEmpty(this.props.name))
        {
            return this.props.name;
        }

        return this.getAttribute().code;
    }

    getValue()
    {
        return this.props.value;
    }

    hasError()
    {
        return _.isObject(this.props.error);
    }

    getErrorMessage()
    {
        return this.props.errorMessage;
    }

    isDisabled()
    {
        return !!this.props.disabled;
    }

    // todo: remove and move all to isDisabled()
    getDisabled()
    {
        return this.props.disabled || '';
    }

    getOnChange()
    {
        if (!_.isFunction(this.props.onChange))
        {
            return e => '';
        }

        // for things like text inputs
        return (value) => {
            if (_.isObject(value) && 'target' in value)
            {
                // it could be Proxy came from React, but we cant be sure, kz we cant do "value instanceof Proxy"
                return this.props.onChange(value.target.value);
            }
            else
            {
                // something else, array or scalar
                return this.props.onChange(value);
            }
        };
    }

    onChange(value)
    {
        this.getOnChange()(value);
    }
}
