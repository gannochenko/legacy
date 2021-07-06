/* eslint-disable class-methods-use-this */

import React from 'react';
import BaseComponent from '../../../../lib/base/component/component.jsx';
import User from '../../../../api/user/entity/entity.client.js';
// import {Gateway} from 'react-gateway';

import './style.less';

export default class Menu extends BaseComponent
{
	constructor()
	{
		super();
		this.extendState({
			opened: false,
		});
	}

	componentDidMount()
	{
		this.on('application-layout-ready', () => {
			if (this._mobileMenu)
			{
				// move it, no way we can use gateway here because of absolute-cover
				$('.menu__mobile-here').append(this._mobileMenu);
			}
		});
	}


	onMenuToggleClick()
	{
		this.toggleMobileMenu();
	}

	onItemMobileClick()
	{
		this.toggleMobileMenu();
	}

    getItems()
    {
        return this.props.items || [];
    }

	getCurrentUrl()
    {
		const route = FlowRouter.current();
		return this.stripQueryParameters(route.path);
	}

	/**
	 * Check if url contains current path
	 * todo: currently this method strips away any query parameters. improve this!
	 * @param url
	 * @returns {boolean}
	 */
	isUrlActive(url)
    {
		if (!_.isStringNotEmpty(url))
		{
			return false;
		}

		return this.getCurrentUrl().indexOf(this.stripQueryParameters(url)) === 0;
	}

	stripQueryParameters(url)
    {
		if (!_.isString(url))
		{
			return '';
		}

		return url.replace(/\?[^?]*$/, '');
	}

	toggleMobileMenu()
	{
		this.setState({
			opened: !this.state.opened,
		});
	}

	isOpened()
	{
		return this.state.opened;
	}

    render()
    {
        return (
	        <div className="menu">
		        <div
			        className="menu__button"
			        onClick={this.onMenuToggleClick.bind(this)}
		        />
		        <div className="menu__items">
			        {
				        this.getItems().map((item) => {

                            if (!User.get() && item.needAuthorized === true) {
                                return null;
                            }

                            if (item.needEditor === true && !User.isEditor()) {
                                return null;
                            }

					        return (
						        <a className={`menu__item ${this.isUrlActive(item.url) ? 'menu__item_active' : ''}`} href={item.url} key={`${item.label}_${item.url}`}>{item.label}</a>
					        );
				        })
			        }
		        </div>
		        <div
			        className={`menu__items-mobile ${this.isOpened() ? 'menu__items-mobile_opened' : ''}`}
					ref={(ref) => { this._mobileMenu = ref; }}
		        >
			        {
				        this.getItems().map((item) => {
				        	if (!User.get() && item.needAuthorized === true) {
				        		return null;
					        }

					        if (item.needEditor === true && !User.isEditor()) {
				        		return null;
					        }

					        return (
						        <a
							        onMouseUp={this.onItemMobileClick.bind(this)}
							        className={`menu__item-mobile ${this.isUrlActive(item.url) ? 'menu__item-mobile_active' : ''}`}
							        href={item.url} key={`${item.label}_${item.url}`}
						        >
							        {item.label}
							    </a>
					        );
				        })
			        }
		        </div>
	        </div>
        );
    }
}
