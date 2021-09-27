import React from 'react';
import PropTypes from 'prop-types';

import BaseComponent from '../../../../lib/base/component/component.jsx';
import Modal from '../etc/modal';
import Selector from '../etc/selector';

import './style.less';

export default class EnumSelector extends BaseComponent {
    static propTypes = {
        className: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.object,
        ]),
        display: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
        ]),
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
        ]),
        items: PropTypes.object,
        onChange: PropTypes.func,
        editMode: PropTypes.bool,
        multiple: PropTypes.bool,
        notDefinedLabel: PropTypes.string,
    };

    static defaultProps = {
        className: '',
        display: null,
        value: '',
        items: null,
        onChange: null,
        editMode: false,
        multiple: true,
        notDefinedLabel: 'Не указано',
    };

    constructor(props) {
        super(props);
        this.extendState({
            opened: false,
	        value: this.getValueInitial(),
	        valueInitial: this.getValueInitial(),
        });
    }

    getValueInitial()
    {
    	return this.props.value;
    }

    getValue()
    {
    	return this.state.value;
    }

    setValue(value)
    {
    	this.setState({
		    value,
	    });
    }

    onSelectorOpen()
    {
        if (!this.isEditMode())
        {
            return;
        }

        this.setState({
            opened: true,
        });
    }

    onSelectorClose()
    {
	    if (!_.deepEqual(this.getValue(), this.state.valueInitial) && _.isFunction(this.props.onChange))
	    {
	    	this.setState({
			    valueInitial: _.deepClone(this.getValue()),
		    });
		    this.props.onChange(this.getValue());
	    }

        this.close();
    }

    onChange(value)
    {
    	this.setValue(value);
    }

    close()
    {
        this.setState({
            opened: false,
        });
    }

    isEditMode()
    {
        return this.props.editMode;
    }

    renderValues() {
        const en = this.props.items;
        const value = this.getValue();

        if (this.props.multiple) {
            if (!_.isObjectNotEmpty(value)) {
                return this.props.notDefinedLabel;
            }

            return this.getValue().map((item) => {
                return en.getValue(item);
            });
        } else {
            if (!_.isStringNotEmpty(value)) {
                return this.props.notDefinedLabel;
            }

            return en.getValue(this.getValue());
        }
    }

    render() {

        const display = this.props.display;

        return (
            <div className={`enum-selector ${this.props.className}`}>
                <span
                    className={this.isEditMode() ? 'registry-detail__link-editable' : ''}
                    onClick={this.onSelectorOpen.bind(this)}
                >
                    {_.isExist(display) ? this.props.display : this.renderValues()}
                </span>
                {
                    this.state.opened
                    &&
                    <Modal
                        onClose={this.onSelectorClose.bind(this)}
                    >
                        <Selector
                            items={this.props.items}
                            multiple={this.props.multiple}
                            value={this.getValue()}
                            onChange={this.onChange.bind(this)}
                        />
                    </Modal>
                }
            </div>
        );
    }
}
