import React from 'react';

import RendererGeneric from '../generic/generic.jsx';
// import './style.less';

export default class CutawayRenderer extends RendererGeneric
{
    getItemId()
    {
        return this.props.item.getId();
    }

    render()
    {
        let title = this.prepareValue();
        if (!title)
        {
            title = 'Untitled';
        }
        else
        {
            title = title.toString();
        }

        const path = this.props.detailPageUrl;
        // todo: get path template from settings
        return (
            <div>
                <a href={path.replace('#ID#', this.getItemId())}>{title}</a><br />
                {this.getItemId()}
            </div>
        );
    }
}
