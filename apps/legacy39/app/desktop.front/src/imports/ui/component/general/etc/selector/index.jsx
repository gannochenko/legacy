import React from 'react';
import Util from '../../../../../lib/util.js';
import BaseComponent from '../../../../../lib/base/component/component.jsx';
import Enum from '../../../../../lib/base/enum/index.js';

import PropTypes from 'prop-types';

import './style.less';

export default class Selector extends BaseComponent
{
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
        items: PropTypes.object, // enum
        name: PropTypes.string,
        onChange: PropTypes.func,
        onItemClick: PropTypes.func,
        multiple: PropTypes.bool,
        itemSelectedClassName: PropTypes.string,
        itemSelectedInnerClassName: PropTypes.string,
    };

    static defaultProps = {
        value: [],
        items: null,
        name: '',
        onChange: null,
        onItemClick: null,
        multiple: false,
        itemSelectedClassName: '',
        itemSelectedInnerClassName: '',
    };

    // constructor(props)
    // {
    //     super(props);
    //     this.extendState({
    //     });
    // }

    componentDidMount()
    {
    }

    componentWillUnmount()
    {
    }

    getOnChange()
    {
        if (_.isFunction(this.props.onChange))
        {
            return this.props.onChange;
        }

        return e => e;
    }

    onChange(value)
    {
        this.getOnChange()(value);
    }

    getEnum()
    {
        return this.props.items || null;
    }

    hasEnum()
    {
        return _.isObject(this.getEnum());
    }

    getValue()
    {
        return this.props.value;
    }

    getName()
    {
        return this.props.name || '';
    }

    isMultiple()
    {
        return this.props.multiple;
    }

    getUnifiedValue()
    {
        const actualValue = this.getValue();

        if (this.isMultiple() && _.isArrayNotEmpty(actualValue))
        {
            return actualValue.filter(x => !!x);
        }
        if (!this.isMultiple() && actualValue)
        {
            return [actualValue];
        }

        return [];
    }

    isItemSelected(item)
    {
        // todo: improve this, indexOf is slow
        return this.getValue().indexOf(item) >= 0;
    }

    onItemSelect(item)
    {
        if (this.isMultiple())
        {
            if (this.isItemSelected(item))
            {
                this.onChange(_.difference(this.getValue(), [item]));
            }
            else
            {
                this.onChange(_.union(this.getValue(), [item]));
            }
        }
        else
        {
            if (this.getValue() === item)
            {
                this.onChange(null);
            }
            else
            {
                this.onChange(item);
            }
        }
    }

    renderItem(item, value)
    {
        return (
            <div
                className={`pl-button ${value.indexOf(item.key) >= 0 ? '' : 'pl-button_inactive'}`}
                key={`${this.getName()}_${item.key}`}
                onClick={this.onItemSelect.bind(this, item.key)}
            >
                <div className="selector__item-text">
                    {item.value}
                </div>
            </div>
        );
    }

    render()
    {
        const value = this.getUnifiedValue();

        return (
            <div className="selector">
                <div
                    className="selector__panel rb-group_x0p5"
                    // ref={ ref => {this._panel = ref; }}
                    // onWheel={this.onDropDownScroll}
                >
                    {
                        this.hasEnum()
                        &&
                        this.getEnum().sortByValueAscAlphabetical().map((item) => {
                            return (this.renderItem(item, value));
                        })
                    }
                </div>
            </div>
        );
    }
}
