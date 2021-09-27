import React from 'react';
import {Meteor} from 'meteor/meteor';
// import PropTypes from 'prop-types';
import {FlowRouter} from 'meteor/kadira:flow-router';
import DataComponent from '../data-component';
import PageScroll from '../../util/page-scroll.js';
import PageNavigation from './component/page-navigation';
import FilterUtil from './filter/util.js';

/**
 * The basic component for making lists
 * @abstract
 */
export default class ListComponent extends DataComponent {

    // static propTypes = {
    //     className: PropTypes.oneOfType([
    //         PropTypes.string,
    //         PropTypes.array,
    //         PropTypes.object,
    //     ]),
    //     entity: PropTypes.func,
    //     detailPageUrl: PropTypes.string,
    // };
    //
    // static defaultProps = {
    //     className: '',
    //     entity: null,
    //     detailPageUrl: '',
    // };

    _scrolled = false;
    _filter = null;

    constructor(params)
    {
        super(params);
        this.extendState({
            page: this.getQueryPage(),
            perPage: this.getPageSize(),

            count: 0,
            countReady: false,
        });
        this.saveFilter(this.getFilterFromURL());

        this._cache.queryParams = null;

        this.transformModel = this.transformModel.bind(this);
    }

    // component init routines

    componentWillMount()
    {
        super.componentWillMount();
        this._scrolled = false;
    }

    componentDidUpdate()
    {
        this.scrollIfReady();
    }

    /**
     * Returns link to the query instance, which execution result we want to display
     * in the list.
     * @abstract
     * @access protected
     */
    getEntity()
    {
        if (this.props.entity !== null)
        {
            return this.props.entity;
        }

        throw new Meteor.Error('Entity not set');
    }

    async getSelect() {
        // return {select: '*'}; to pick all fields
        return {_id: 1};
    }

    async getFilterConstant() {
        return {};
    }

    async getSort() {
        return undefined;
    }

    async getFilter() {
        const both = [];

        const mandatory = await this.getFilterConstant();
        if (_.isObjectNotEmpty(mandatory)) {
            both.push(mandatory);
        }

        const savedFilter = this.getSavedFilter();
        if (_.isObjectNotEmpty(savedFilter)) {
            both.push(savedFilter);
        }

        if (_.isArrayNotEmpty(both)) {
            console.dir(both);
            return {$and: both};
        }

        return {};
    }

    getFilterSettings() {
        return null;
    }

    getPageSize()
    {
        return 10;
    }

    invalidateCache() {
        super.invalidateCache();
        this.invalidateItemCache();
    }

    invalidateItemCache() {
        this._cache.items = {};
    }

    getItemCache() {
        return this._cache.items;
    }

    scrollIfReady()
    {
        if (this.isReady() && !this._scrolled)
        {
            PageScroll.scrollToStored();
            this._scrolled = true;
        }
    }

    loadData() {
        this.appWait(this.fetchData()).catch((err) => {
            // todo: NOTIF
            this.showConsoleError('Unable to get data (maybe forgot to expose?)', err);
            this.setData([]);
            this.setCount(0);
        });
    }

    async fetchData() {
        return this.getQueryParameters().then((parameters) => {
            this._cache.queryParams = parameters;

            console.dir(parameters);

            this.setState({
                countReady: false,
                dataReady: false,
            });

            // clear item cache
            this.invalidateItemCache();
            this._cache.item = {};

            return Promise.all([
                this.loadItems().then((res) => {
	                this.setData(res.map(this.transformModel));
                }),
                this.loadCount().then((res) => {
	                this.setCount(res);
                }),
            ]);
        });
    }

    /**
     * Returns query parameters. It can be async in implementations, for example, if
     * we need to get some remote criteria asynchronously before building the list
     * @returns {Promise.<{}>}
     * @access protected
     */
    async getQueryParameters()
    {
        return {
            select: await this.getSelect(),
            filter: await this.getFilter(),
            sort: await this.getSort(),
        };
    }

    // onListUpdate()
    // {
    //     this.loadData();
    // }

    assignPageParameters(params)
    {
        return Object.assign(_.clone(params), {
            limit: this.getPageSize(),
            offset: this.getPageSize() * (this.getPage() - 1),
        });
    }

    getFindParameters() {
        return null;
    }

    async loadItems()
    {
        const qParams = this._cache.queryParams;
        if (!qParams)
        {
            throw new Meteor.Error('Calling .loadItems() while query params are not ready');
        }

        return this.getEntity().find(this.assignPageParameters(qParams), this.getFindParameters());
    }

    transformModel(data)
    {
        return data;
    }

    /**
     * Loads record count by executing the given query
     * @returns void
     * @access protected
     */
    async loadCount()
    {
        const qParams = this._cache.queryParams;
        if (!qParams)
        {
            throw new Meteor.Error('Calling .loadCount() while query params are not ready');
        }

        return this.getEntity().getCount(qParams.filter || {});
    }

    setCount(count)
    {
        this.setState({
            count: parseInt(count, 10),
            countReady: true,
        });
    }

    /**
     * Retrives count from the state
     * @returns {number}
     * @access protected
     */
    getCount()
    {
        return this.state.count;
    }

    // pagination

    /**
     * Updates list when page changes
     * @param {Number} page
     * @returns void
     * @access protected
     */
    onPageChange(page)
    {
        if (page !== this.state.page) {
            this.setQueryPage(page); // update page in url
            this.setState({
                page,
            }, () => {
                this.loadItems().then((res) => {
	                this.setData(res.map(this.transformModel));
                });
            });
        }
    }

    getPage()
    {
        return this.state.page;
    }

    /**
     * Returns page number specified in the URL
     * @returns {Number}
     * @access protected
     */
    getQueryPage()
    {
        return parseInt(FlowRouter.getQueryParam('page') || 1, 10);
    }

    /**
     * Sets page number back to the URL
     * @param {Number} page
     * @access protected
     */
    setQueryPage(page)
    {
        FlowRouter.setQueryParams({page});
    }

    isFilterDefined() {
        return _.isExist(this.getFilterSettings());
    }

    saveFilter(filter) {
        this._filter = filter;
    }

    getSavedFilter() {
        return this._filter;
    }

    getFilterFromURL()
    {
        if (this.isFilterDefined()) {
            let filter = this.extractFilterFromUrl();
            if (!_.isObjectNotEmpty(filter)) {
                return null;
            }

            return this.validateFilter(filter);
        }

        return null;
    }

    extractFilterFromUrl() {
        let fParam = FlowRouter.getQueryParam('filter');
        if (_.isStringNotEmpty(fParam)) {
            return this.decodeFilter(fParam);
        }

        return null;
    }

    putFilterToUrl() {
        FlowRouter.setQueryParams({
            filter: this.encodeFilter(this.getSavedFilter()),
        });
    }

    setFilter(filter) {
        if (this.isFilterDefined()) {
            this.saveFilter(this.validateFilter(filter));
            this.putFilterToUrl();
            this.loadData();
        }
    }

    validateFilter(filter) {
        return this.getFilterSettings().validate(filter);
    }

    encodeFilter(filter) {
        return FilterUtil.encodeFilter(filter);
    }

    decodeFilter(filter) {
        return FilterUtil.decodeFilter(filter);
    }

    getFilterUrlParameter() {
        return FilterUtil.getFilter();
    }

    /**
     * Returns true if all data were loaded
     * @returns {boolean}
     * @access protected
     */
    isReady()
    {
        return (
            this._cache.queryParams // query params ready
            &&
            this.state.countReady // we loaded count
            &&
            super.isReady() // we loaded items
        );
    }

    needPageNav()
    {
        return Math.ceil(this.getCount() / this.getPageSize()) > 1;
    }

    renderPageNav() {
        return (
            <PageNavigation
                page={this.getPage()}
                pageSize={this.getPageSize()}
                count={this.getCount()}
                onPageSelect={this.onPageChange.bind(this)}
            />
        );
    }

    /**
     * Renders the component
     * @returns {XML}
     * @access protected
     */
    render()
    {
        if (!this.isReady())
        {
            return null;
        }

        return (
            <div className="">
                <div className="rb-margin-b_x">
                    <div className="rb-group_x">
                        {
                            this.getData().map((item) => {
                                return (
                                    <div
                                        key={item.getId()}
                                        className=""
                                    >
                                        {item.getId()}
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                {this.renderPageNav()}
            </div>
        );
    }
}
