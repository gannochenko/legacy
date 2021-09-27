import React from 'react';
import BaseComponent from '../component/component.jsx';

export default class DataComponent extends BaseComponent
{
    constructor(props) {
        super(props);
        this.extendState({
            data: null,
            dataReady: false,
            // todo: implement data update decorator, with placeholder
        });
    }

    componentDidMount()
    {
        super.componentDidMount();
        this.loadData();
    }

    componentWillReceiveProps(props)
    {
        super.componentWillReceiveProps(props);
        if (this.wereWatchedPropsChanged(props))
        {
            this.loadData(props);
        }
    }

    getWatchedProps()
    {
        return ['id'];
    }

    wereWatchedPropsChanged(props)
    {
        const p = this.getWatchedProps();
        if (_.isArrayNotEmpty(p))
        {
            for (let k = 0; k < p.length; k++)
            {
                if (props[p[k]] !== this.props[p[k]])
                {
                    return true;
                }
            }
        }

        return false;
    }

    async fetchData(props)
    {
        throw new Error('Not implemented: .fetchData()');
    }

    async loadData(props)
    {
        props = props || this.props;

        return this.appWait(this.fetchData(props)).then((res) => {
            this.setData(res);
        }).catch(() => {
            // todo: NOTIF
            this.setData(null);
        })
    }

    setData(data)
    {
        this.setState({
            data,
            dataReady: true,
        });
    }

    getData()
    {
        return this.state.data || {};
    }

	isReady()
	{
		return !!this.state.dataReady;
	}
}
