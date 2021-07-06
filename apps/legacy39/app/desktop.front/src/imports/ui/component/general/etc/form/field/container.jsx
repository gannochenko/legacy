import React from 'react';

import PropTypes from 'prop-types';

export default class Container extends React.Component
{
    static propTypes = {
        listMode: PropTypes.bool,
        className: PropTypes.string,
    };

    static defaultProps = {
        listMode: false,
        className: '',
    };

    hasError()
    {
        return _.isObject(this.props.errorProps.error);
    }

    getErrorMessage()
    {
        return this.props.errorProps.errorMessage;
    }

    getAttribute()
    {
        return this.props.attribute || null;
    }

    render()
    {
        const hasError = this.hasError();

        const className = ['form__row'];
        if (_.isStringNotEmpty(this.props.className))
        {
            className.push(this.props.className);
        }
        if (hasError)
        {
            className.push('form__container_error');
        }

        return (
            <div className={className.join(' ')}>
                <div className="rb-margin-b_x rb-f-size_x">
                    {this.props.label}
                </div>
                {
                    this.props.children
                }
                {
                    hasError
                    &&
                    <div className="form__error margin-t_x0p5">{this.getErrorMessage()}</div>
                }
            </div>
        );
    }
}
