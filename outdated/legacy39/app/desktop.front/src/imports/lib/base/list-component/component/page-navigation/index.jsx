import React from 'react';
import PropTypes from 'prop-types';
import PageScroll from '../../../../util/page-scroll.js';
import BaseComponent from '../../../component/component.jsx';

import './style.less';

export default class PageNavigation extends BaseComponent
{
    static propTypes = {
        page: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        onPageSelect: PropTypes.func.isRequired,
        isSmall: PropTypes.bool,
    };

    static defaultProps = {
        page: 1,
        pageSize: 10,
        count: 0,
        onPageSelect: null,
        isSmall: false,
    };

    constructor(props)
    {
        super(props);
        this.onPreviousPageClick = this.onPreviousPageClick.bind(this);
        this.onNextPageClick = this.onNextPageClick.bind(this);
    }

    onPageClick(page) {
        PageScroll.scrollTo();
        if (_.isFunction(this.props.onPageSelect))
        {
            this.props.onPageSelect(page);
        }
    }

    onPreviousPageClick()
    {
        if (this.getPage() > 1)
        {
            this.onPageClick(this.getPage() - 1);
        }
    }

    onNextPageClick()
    {
        if (this.getPage() < this.getPageCount())
        {
            this.onPageClick(this.getPage() + 1);
        }
    }

    getPageCount()
    {
        return Math.ceil(this.props.count / this.props.pageSize);
    }

    getPage()
    {
        return this.props.page || 1;
    }

    getRadius()
    {
        return 2;
    }

    getRange()
    {
        const pageCount = this.getPageCount();
        const page = this.getPage();
        const radius = this.getRadius();

        const r = [page - radius, page + radius];
        if (r[0] < 1)
        {
            r[1] += 1 - r[0];
            r[0] = 1;
            if (r[1] > pageCount)
            {
                r[1] = pageCount;
            }
        }

        if (r[1] > pageCount)
        {
            r[0] -= r[1] - pageCount;
            r[1] = pageCount;
            if (r[0] < 1)
            {
                r[0] = 1;
            }
        }

        return r;
    }

    renderRange() {
        const r = [];
        const range = this.getRange();

        for(let k = range[0]; k <= range[1]; k++)
        {
            r.push(
                <button
                    key={k}
                    onClick={this.onPageClick.bind(this, k)}
                    className={`page-navigation__page-button pl-button ${this.getPage() === k ? 'pl-button_red' : ''}`}
                >
                    {k}
                </button>
            );
        }

        return r;
    }

    render() {
        if (this.getPageCount() < 2)
        {
            return null;
        }

        return (
            <div className="page-navigation">
                <div className="rb-group_x">
                    <button
                        onClick={this.onPreviousPageClick}
                        className="pl-button"
                    >
                        &lt;
                    </button>
                    {this.renderRange()}
                    <button
                        onClick={this.onNextPageClick}
                        className="pl-button"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        );
    }
}
