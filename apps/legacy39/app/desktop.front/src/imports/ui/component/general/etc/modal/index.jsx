import React from 'react';
import {Gateway} from 'react-gateway';
import PropTypes from 'prop-types';

import Util from '../../../../../lib/util.js';
import BaseComponent from '../../../../../lib/base/component/component.jsx';
import './style.less';

export default class Modal extends BaseComponent
{
    static open(children, params)
    {
        this.fire('modal-singleton-open', [children, params]);
    }

    static close()
    {
        this.fire('modal-singleton-close');
    }

    static get()
    {
        return this.__singleton;
    }

    static propTypes = {
        onClose: PropTypes.func,
	    onCloseByUser: PropTypes.func,
        useContentPadding: PropTypes.bool,
        singleton: PropTypes.bool,
	    maximizeHeight: PropTypes.bool,

	    closeByOutsideClick: PropTypes.bool,
    };

    static defaultProps = {
        onClose: null,
	    onCloseByUser: null,
        useContentPadding: true,
        singleton: false,
	    maximizeHeight: false,

	    closeByOutsideClick: true,
    };

    constructor(props)
    {
        super(props);
        this.extendState({
            open: false,
            closeLocked: false,
        });
    }

    componentDidMount()
    {
	    super.componentDidMount();

        // this.on('document-click', this.onDocumentClick.bind(this));
        this.on('document-keydown', this.onDocumentKeyDown.bind(this));

        if (this.isSingleton())
        {
            this.on('modal-singleton-open', this.open.bind(this));
            this.on('modal-singleton-close', this.close.bind(this));

            this.constructor.__singleton = this;
        }

	    if (!this.hideNow())
	    {
		    this.lockBody();
	    }

	    if (_.isFunction(this.props.onAfterMount)) {
            this.props.onAferMount();
        }
    }

    componentDidUpdate()
    {
	    if (!this.hideNow())
	    {
		    this.lockBody();
	    }
	    else
	    {
	    	this.unlockBody();
	    }
    }

    componentWillUnmount()
    {
    	this.unlockBody();
        this.constructor.__singleton = null;
    }

    // todo: maybe hang on capture
	onContentClick(e)
    {
    	if (this.getProps().closeByOutsideClick !== false)
	    {
		    const node = Util.findClosestParent(e.target, this._modal);
		    if (!node)
		    {
			    // outside click
			    this.closeByUser();
		    }
	    }
    }

    onDocumentKeyDown(e)
    {
        if (e.key === 'Escape')
        {
            this.close();
        }
    }

	lockBody()
	{
		$('body').addClass('rb-no-overflow');
	}

	unlockBody()
	{
		$('body').removeClass('rb-no-overflow');
	}

	disableClose()
    {
        this.setState({
            closeLocked: true,
        });
    }

    enableClose()
    {
        this.setState({
            closeLocked: false,
        });
    }

    isCloseLocked()
    {
        return this.state.closeLocked;
    }

    open(content, props = {})
    {
        if (this.isSingleton())
        {
            this.setState({
                open: true,
                content,
                props: props || {},
            });
        }
    }

    close()
    {
        // if (this.isCloseLocked())
        // {
        //     return;
        // }

        if (this.isSingleton())
        {
            this.setState({
                open: false,
                content: null,
                props: {},
            });
        }

        if (_.isFunction(this.props.onClose)) {
            this.props.onClose();
        }
    }

    closeByUser()
    {
        if (this.isCloseLocked())
        {
            return;
        }

    	this.close();
    	if (_.isFunction(this.props.onCloseByUser))
	    {
	    	this.props.onCloseByUser();
	    }
    }

    isSingleton()
    {
        return !!this.props.singleton;
    }

    getProps()
    {
        return this.isSingleton() ? this.state.props : this.props;
    }

    getChildren()
    {
        if (this.isSingleton())
        {
            const content = this.state.content;

            if (React.isValidElement(content))
            {
                return content;
            }
            else if (_.isObject(content))
            {
                return React.createElement(
                    content,
                    {}
                );
            }
            else
            {
                return null;
            }
        }
        else
        {
            return super.getChildren();
        }
    }

	hideNow()
	{
		return this.isSingleton() && !this.state.open;
	}

	isPadded()
	{
		return this.getProps().useContentPadding !== false;
	}

    render()
    {
        if (this.hideNow())
        {
            return null;
        }

        const props = this.getProps();

        return (
            <Gateway into="modal-place">
                <div className="modal">
	                <div className="modal__overlay rb-fade rb-in_0p5s"/>
	                <div
		                className="modal__content"
		                onClick={this.onContentClick.bind(this)}
	                >
		                <div
			                ref={(ref) => { this._modal = ref; }}
			                className={`modal__window modal__window_md ${props.maximizeHeight ? 'modal__window_maximize-height' : ''}`}
		                >
			                <div
				                className={`modal__close ${this.isCloseLocked() ? 'modal__close_locked' : ''}`}
				                onClick={this.closeByUser.bind(this)}
			                />
			                <div className={`modal__window-inner ${this.isPadded() ? 'modal__window-inner_padded' : ''}`}>
				                {this.getChildren()}
			                </div>
		                </div>
	                </div>
                </div>
            </Gateway>
        );
    }
}
