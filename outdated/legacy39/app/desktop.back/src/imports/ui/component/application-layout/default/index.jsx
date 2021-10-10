import React from 'react';
import BaseComponent from '../../../../lib/base/component/component.jsx';
import PropTypes from 'prop-types';

import Header from '../../header';
import GlobalOverlay from '../../general/etc/global-overlay';
import GlobalLoadProgress from '../component/global-load-progress';
import Navigation from '../../navigation/navigation.jsx';
import GoUp from '../../general/etc/go-up';

export default class DefaultApplicationLayout extends BaseComponent
{
    static propTypes = {
        ready: PropTypes.bool,
    };

    static defaultProps = {
        ready: false,
    };

    isReady()
    {
        return !!this.props.ready;
    }

    render()
    {
        return (
            <div
                className="layout"
            >
                <GlobalOverlay
                    ready={this.isReady()}
                />
                <Header
                    ready={this.isReady()}
                />
                <GlobalLoadProgress
                    ready={this.isReady()}
                />

                <div className="ui container">
                    <div className="ui equal width grid">
                        <div className="row">
                            <div className="
                                computer only
                                tablet only
                                column
                                layout__side
                            ">
                                {
                                    this.isReady()
                                    &&
                                    <Navigation
                                        className="margin-bottom"
                                    />
                                }
                            </div>
                            <div className="
                                twelve wide computer
                                twelve wide tablet
                                sixteen wide mobile
                                siz
                                column
                            ">
                                {
                                    this.isReady()
                                    &&
                                    <div className="layout__central-container">
                                        {this.props.children}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <GoUp
                    hAlignRelativeTo=".layout__side"
                />
            </div>
        );
    }
}
