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
        showHeader: PropTypes.bool,
    };

    static defaultProps = {
        central: null,
        title: '',
        backUrl: '',
        showHeader: true,
    };

    _title = null;

    constructor(props)
    {
        super(props);
        this.on('set-title', (title) => {
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
            <div className="page__content rb-tall">
                <div className="rb-tall grid-y">
                    {
                        _.isObjectNotEmpty(this.props.top)
                        &&
                        <div className="cell">
                            {this.props.top}
                        </div>
                    }
                    <div className="cell rb-flex-grow_2">
                        <div className="grid-container">
                            <div className="cell">
                                {
                                    this.props.showHeader
                                    &&
                                    <h1
                                        className="page__title rb-margin-b_x2"
                                    >
                                        <span ref={(ref) => {this._title = ref;}}>{title}</span>
                                        {
                                            _.isStringNotEmpty(backUrl)
                                            &&
                                            <a href={backUrl} className="page__title-back" title="Back">
                                                <span className="page__title-back-icon" />
                                            </a>
                                        }
                                    </h1>
                                }
                                <div>
                                    {this.props.children || this.props.central}
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        _.isObjectNotEmpty(this.props.bottom)
                        &&
                        <div className="cell">
                            {this.props.bottom}
                        </div>
                    }
                </div>
            </div>
        );
    }
}
