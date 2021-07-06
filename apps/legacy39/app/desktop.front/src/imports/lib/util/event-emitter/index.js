/**
 * Custom global event emitter
 *
 * todo: also, there could be onMouseMove, onMouseWheel, onDocumentClick, onDocumentKeyDown and so on...
 *
 * Reserved types of events, than can only be global
 * * window-metric-change - window resize
 * * document-click - click at any node in DOM
 * * document-keydown - key down on any node in DOM
 */
export default class EventEmitter
{
    static _instance = null;

    static getInstance()
    {
        if (!this._instance)
        {
            this._instance = new this();
            if (Meteor.isDevelopment)
            {
                window.__emitter = this._instance;
            }
        }

        return this._instance;
    }

    _events = [];
    _windowMetricsEvents = [];
    _windowMetricsBound = false;
    _documentClickEvents = [];
    _documentClickBound = false;
    _documentKeyDownEvents = [];
    _documentKeyDownBound = false;

    constructor()
    {
        this.onWindowMetricChange = _.throttle(this.onWindowMetricChange.bind(this), 300);
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
    }

    /**
     * Hangs on the specified custom event
     * @param event
     * @param cb
     * @param owner Store a reference to be able to make off() by the certain owner
     * @param scope Event scope - global or only on owner
     */
    on(event, cb, owner = null, scope = null)
    {
        // hang a reserved event handler
        if (event === 'window-metric-change')
        {
            this._windowMetricsEvents.push({
                cb,
                owner,
            });

            this.maybeBindMetricEvent();
        }
        else if (event === 'document-click')
        {
            this._documentClickEvents.push({
                cb,
                owner,
            });

            this.maybeBindDocumentClick();
        }
        else if (event === 'document-keydown')
        {
            this._documentKeyDownEvents.push({
                cb,
                owner,
            });

            this.maybeBindDocumentKeyDown();
        }
        else if(owner)
        {
            // hang some custom event handler
            this._events.push({
                event,
                cb,
                owner,
            });
        }
    }

    /**
     * Remove the custom event handler
     * @param event
     * @param cb
     */
    off(event, cb)
    {
        // remove a reserved event handler
        if (event === 'window-metric-change')
        {
            this._windowMetricsEvents = this._windowMetricsEvents.filter((item) => {
                return item.cb !== cb;
            });

            this.maybeUnbindMetricEvent();
        }
        else if (event === 'document-click')
        {
            this._documentClickEvents = this._documentClickEvents.filter((item) => {
                return item.cb !== cb;
            });

            this.maybeUnbindDocumentClick();
        }
        else if (event === 'document-keydown')
        {
            this._documentKeyDownEvents = this._documentKeyDownEvents.filter((item) => {
                return item.cb !== cb;
            });

            this.maybeUnbindDocumentKeyDown();
        }
        else
        {
            // remove some custom event handler
            this._events = this._events.filter((item) => {
                return item.cb !== cb || item.event !== event;
            });
        }
    }

    /**
     * Remove all custom event handlers by the specified owner
     * @param owner
     */
    offByOwner(owner)
    {
        // drop custom event handlers
        if(_.isArrayNotEmpty(this._events))
        {
            this._events = this._events.filter((item) => {
                return item.owner !== owner;
            });
        }

        // drop reserved event handlers
        if (_.isArrayNotEmpty(this._windowMetricsEvents))
        {
            this._windowMetricsEvents = this._windowMetricsEvents.filter((item) => {
                return item.owner !== owner;
            });

            this.maybeUnbindMetricEvent();
        }

        if (_.isArrayNotEmpty(this._documentClickEvents))
        {
            this._documentClickEvents = this._documentClickEvents.filter((item) => {
                return item.owner !== owner;
            });

            this.maybeUnbindDocumentClick();
        }

        if (_.isArrayNotEmpty(this._documentKeyDownEvents))
        {
            this._documentKeyDownEvents = this._documentKeyDownEvents.filter((item) => {
                return item.owner !== owner;
            });

            this.maybeUnbindDocumentKeyDown();
        }
    }

    /**
     * Fires the specified custom event. You cant fire a reserved event manually
     * todo: probably use event emitter here
     * @param event
     * @param args
     * @param scope Event scope - fire event globally or only on owner
     */
    fire(event, args = [], scope = null)
    {
        this._events.forEach((item) => {
            if (item.event === event)
            {
                item.cb(...args);
            }
        });
    }

    // reserved event conditional binders/un-binders

    maybeBindMetricEvent()
    {
        if (!this._windowMetricsBound)
        {
            $(window).on('scroll', this.onWindowMetricChange);
            $(window).on('resize', this.onWindowMetricChange);
            this._windowMetricsBound = true;
        }
    }

    maybeUnbindMetricEvent()
    {
        if (!(this._windowMetricsEvents.length) && this._windowMetricsBound)
        {
            $(window).off('scroll', this.onWindowMetricChange);
            $(window).off('resize', this.onWindowMetricChange);
            this._windowMetricsBound = false;
        }
    }

    maybeBindDocumentClick()
    {
        if (!this._documentClickBound)
        {
            $(window.document).on('click', this.onDocumentClick);
            this._documentClickBound = true;
        }
    }

    maybeUnbindDocumentClick()
    {
        if (!(this._documentClickEvents.length) && this._documentClickBound)
        {
            $(window.document).off('click', this.onDocumentClick);
            this._documentClickBound = false;
        }
    }

    maybeBindDocumentKeyDown()
    {
        if (!this._documentKeyDownBound)
        {
            $(window.document).on('keydown', this.onDocumentKeyDown);
            this._documentKeyDownBound = true;
        }
    }

    maybeUnbindDocumentKeyDown()
    {
        if (!(this._documentKeyDownEvents.length) && this._documentKeyDownBound)
        {
            $(window.document).off('keydown', this.onDocumentKeyDown);
            this._documentKeyDownBound = false;
        }
    }

    // reserved event handlers

    onDocumentClick(e)
    {
        this._documentClickEvents.forEach((item) => {
            item.cb(e);
        });
    }

    onDocumentKeyDown(e)
    {
        this._documentKeyDownEvents.forEach((item) => {
            item.cb(e);
        });
    }

    onWindowMetricChange()
    {
        const data = {};
        const w = this.getWindowJQ();

        data.scrollTop = w.scrollTop();

        this._windowMetricsEvents.forEach((item) => {
            item.cb(data);
        });
    }

    // util

    getWindowJQ()
    {
        if (!this._window)
        {
            this._window = $(window);
        }

        return this._window;
    }
}
