import React from 'react';
import PropTypes from 'prop-types';

import BaseComponent from '../../../../lib/base/component/component.jsx';
import './style.less';

export default class RichBlock extends BaseComponent
{
    static propTypes = {
        className: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.object,
        ]),
        placeholder: PropTypes.string,
        editMode: PropTypes.bool,
        onChange: PropTypes.func,
        debounce: PropTypes.number,
	    onRenderPreview: PropTypes.func,
    };

    static defaultProps = {
        className: '',
        placeholder: 'Type something here',
        editMode: false,
        onChange: null,
        debounce: 0,
	    onRenderPreview: null,
    };

    _touched = false;

    constructor(params) {
        super(params);
        this._prevText = this.getValue();

        this.initOnChange();
    }

    componentWillReceiveProps(props)
    {
        super.componentWillReceiveProps(props);
        if ('editMode' in props && (props.editMode !== this.props.editMode))
        {
            this._touched = false;
        }

        if ('value' in props && props.value !== this.props.value)
        {
            this._prevText = props.value;
        }
    }

    componentDidMount()
    {
        super.componentDidMount();
        if (this.isEditMode())
        {
            this.setInputContents(this.getValue());
        }
    }

    componentDidUpdate()
    {
        super.componentDidMount();
        if (!this._touched)
        {
	        this.setInputContents(this.getValue());
        }
    }

    onInputKeyUp()
    {
        if (this.isEditMode())
        {
            const text = this.getText();
            if (text !== this._prevText)
            {
                this._touched = true;
                this._onChange(this.getInput().innerHTML, text);
                this._prevText = text;
                this.forceUpdate();
            }
        }
    }

    onInputClick()
    {
        if (this.isEditMode() && this.getInput()) {
            this.getInput().focus();
        }
    }

	setInputContents(value)
    {
        if (this._input)
        {
            this._input.innerHTML = value;
        }
    }

    initOnChange()
    {
        if (_.isFunction(this.props.onChange))
        {
            this._onChange = this.props.onChange.bind(this);
            if (this.props.debounce > 0) {
                this._onChange = _.debounce(this._onChange, this.props.debounce);
            }
        }
        else
        {
            this._onChange = x => x;
        }
    }

    getText()
    {
        const i = this.getInput();
        if (!i)
        {
            return '';
        }

        return i.innerText;
    }

    getInput()
    {
        return this._input;
    }

    isEditMode()
    {
        return this.props.editMode;
    }

    getValue()
    {
        return this.props.value || '';
    }

    hasValue()
    {
        return _.isStringNotEmpty(this.getValue());
    }

    hasSomething()
    {
        if (this._touched)
        {
            return _.isStringNotEmpty(this.getText());
        }

        return _.isStringNotEmpty(this.getValue());
    }

    renderPreview()
    {
        if (_.isFunction(this.props.onRenderPreview))
        {
            return this.props.onRenderPreview(this.getValue());
        }

        return this.getValue();
    }

    render()
    {
        // https://www.npmjs.com/package/sanitize-html
        return (
            <div className={`rich-block ${this.props.className}`}>
                {
                    !this.isEditMode()
                    &&
                    <div className="rich-block__display">
                        {this.renderPreview(this.getValue())}
                    </div>
                }
	            {
		            (this.isEditMode() && !this.hasSomething())
		            &&
		            <div
			            className="rich-block__placeholder"
			            onClick={this.onInputClick.bind(this)}
		            >
			            {this.props.placeholder || ''}
		            </div>
	            }
                {
                    this.isEditMode()
                    &&
                    <div
                        className="rich-block__input"
                        contentEditable={this.isEditMode()}
                        onKeyUp={this.onInputKeyUp.bind(this)}
                        ref={(ref) => { this._input = ref; }}
                    />
                }
            </div>
        );
    }
}
