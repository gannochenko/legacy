/* eslint-disable class-methods-use-this */

import React from 'react';
import BasePage from '../../../lib/base/page/page.jsx';
import Layout from '../../component/application-layout/component/page/index.jsx';
import Detail from '../../component/registry.detail/index.jsx';

export default class RegistryDetailPage extends BasePage
{
    getId()
    {
        const route = this.props.route || {};
        return route.id || '';
    }

	render()
    {
        return (
            <Layout
                showHeader={false}
                central={
                    <Detail
                        id={this.getId()}
                        section={this.props.route.section}
                    />
                }
            />
        );
    }
}
