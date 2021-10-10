import React from 'react';
import {Component} from 'react';
import {Meteor} from 'meteor/meteor';

import Application from '../../../ui/application.jsx';
import Util from '../../util.js';

import EventEmitter from '../../util/event-emitter';

export default class BaseComponent extends Component
{
    _scope = null;
    _cache = null; // this is used to store temporal cached data, to boost operations
    _id = null;
    // _vars = {};

    constructor(props)
    {
        super(props);
        this.state = {};
        this.invalidateCache();
    }

    componentWillMount()
    {
    }

    componentWillUnmount()
    {
        EventEmitter.getInstance().offByOwner(this);
    }

    componentDidMount()
    {
    }

    componentWillReceiveProps(props)
    {
    }

    appWait(p) {
        return this.getApplication().wait(p);
    }

    /**
     * Drops the cache of temporal data
     */
    invalidateCache()
    {
        this._cache = {};
    }

    /**
     * Adds new keys to the state, no reactivity, use it only in constructor
     * @param extra
     */
    extendState(extra)
    {
        if(_.isObject(extra))
        {
            Object.assign(this.state, extra);
        }
    }

    /**
     * Just a shortcut to the app instance
     * @returns {{wait}|*}
     */
    getApplication()
    {
        return Application.getInstance();
    }

    /**
     * Returns the root node of the component, if any
     *
     * Dont forget to add
     * ref={ref => {this._scope = ref;}}
     * inside render() function to make this work.
     * @returns {*}
     */
    getRootNode()
    {
        return this._scope;
    }

    /**
     * Returns the className property, if any
     */
    getClassName()
    {
        return this.props.className || '';
    }

    getChildren()
    {
        return this.props.children || null;
    }

    setTitle(title = '')
    {
        this.fire('set-title', [title]);
    }

    propWillBeChanged(props, prop)
    {
        return prop in props && props[prop] !== this.props[prop];
    }

    /**
     * Executes a method, returns promise
     * @param name
     * @param args
     * @returns {Promise}
     */
    async execute(name, args)
    {
        return Util.execute(name, args).catch((error) => {
            this.showConsoleError(
                `Error invoking Method '${name}': `,
                error
            );

            throw error;
        });
    }

    showConsoleError(...args)
    {
        if (Meteor.isDevelopment)
        {
            // eslint-disable-next-line no-console
            console.error.apply(this, args);
        }

        // todo: show error notification
    }

    notifyUser(text, props = {})
    {
        this.fire('notification-show', [{
            text,
            ...props,
        }]);
    }

    on(event, cb)
    {
        EventEmitter.getInstance().on(event, cb, this);
    }

    off(event, cb)
    {
        EventEmitter.getInstance().off(event, cb);
    }

    fire(event, args = [])
    {
        EventEmitter.getInstance().fire(event, args);
    }

    onThis() {
        // todo: hang with a scope
    }

    offThis() {
        // todo: remove with a scope
    }

    fireThis() {
        // todo: fire with a scope
    }

    getId()
    {
        if (this._id === null)
        {
            this._id = _.random(100000, 999999);
        }

        return this._id;
    }

    go(url)
    {
        FlowRouter.go(url);
    }

    goByError(e)
    {
        if (!e)
        {
            this.go500();
        }
        else
        {
            if (e.error === 401)
            {
                this.go401();
            }
            else if (e.error === 403)
            {
                this.go403();
            }
            else if (e.error === 404)
            {
                this.go404();
            }
            else
            {
                this.go500();
            }
        }
    }

    go401()
    {
        FlowRouter.go('/401');
    }

    go403()
    {
        FlowRouter.go('/403');
    }

    go404()
    {
        FlowRouter.go('/404');
    }

    go500()
    {
        FlowRouter.go('/404');
    }

    /**
     * Ret current back url
     * @returns {*}
     */
    getBackUrl(encode = false)
    {
        let backUrl = '';

        if (_.isStringNotEmpty(this.props.backUrl))
        {
            backUrl = this.props.backUrl;
        }
        else
        {
            backUrl = this.extractBackUrl();
        }
        
        return encode ? encodeURIComponent(backUrl) : backUrl;
    }

    /**
     * Make backurl out of the current path
     * @returns {string}
     */
    makeBackUrl()
    {
        return encodeURIComponent(FlowRouter.current().path);
    }

    /**
     * Returns back url, if it was passed in the url query string, and makes it safe to go to
     * @param fallBack
     * @returns {*}
     */
    extractBackUrl(fallBack = '')
    {
        const url = Util.parseUrl();
        let backUrl = '';
        if (url.params)
        {
            const param = url.params.backurl || url.params.backUrl;
            if (_.isStringNotEmpty(param))
            {
                backUrl = param;
            }
        }

        if (backUrl)
        {
            // "open redirect" attack protection
            return backUrl.replace(new RegExp(':+/+', 'g'), '/');
        }

        return fallBack;
    }

    putBackUrl(url)
    {
        if (_.isStringNotEmpty(url))
        {
            const qm = url.indexOf('?') < 0;
            return `${url}${qm ? '?' : '&'}backUrl=${this.makeBackUrl()}`;
        }

        return url;
    }

    getCache()
    {
        this._cache = this._cache || {};
        return this._cache;
    }

    static fire(event, args = [])
    {
        EventEmitter.getInstance().fire(event, args);
    }
}
