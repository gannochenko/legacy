import React from 'react';
import BaseComponent from '../../../../../lib/base/component/component.jsx';
import PropTypes from 'prop-types';

import './style.less';

export default class Page extends BaseComponent
{
    static propTypes = {
        central: PropTypes.object,
        title: PropTypes.string,
        backUrl: PropTypes.string,
    };

    static defaultProps = {
        central: null,
        title: '',
        backUrl: '',
    };

    _title = null;

    constructor(props)
    {
        super(props);
        this.on('set-title', (e, title) => {
            if (this._title)
            {
                this._title.innerText = title;
            }
        });
    }

    getTitle()
    {
        return _.isStringNotEmpty(this.props.title) ? this.props.title : '';
    }

    render()
    {
        const title = this.getTitle();
        const backUrl = this.props.backUrl;

        return (
            <div className="">
                {
                    !!title
                    &&
                    <h1
                        className="ui dividing header layout__header"
                    >
                        <span ref={(ref) => {this._title = ref;}}>{title}</span>
                        {
                            _.isStringNotEmpty(backUrl)
                            &&
                            <a href={backUrl} className="layout__header-back" title="Back">
                                <span className="layout__header-back-icon" />
                            </a>
                        }
                    </h1>
                }
                <div className="">
                    {this.props.children || this.props.central}
                </div>
            </div>
        );
    }
}
