/* eslint-disable class-methods-use-this */

import React from 'react';
import BasePage from '../../../lib/base/page/page.jsx';
import Layout from '../../component/application-layout/component/page/index.jsx';
import Detail from './component/detail/index.jsx';

export default class RegistryDetailPage extends BasePage
{
    getPageTitle()
    {
        return 'Объект';
    }

    getId()
    {
        const route = this.props.route || {};
        return route.id || '';
    }

	render()
    {
        return (
            <Layout
                title={this.getPageTitle()}
                central={
                    <Detail
                        id={this.getId()}
                    />
                }
            />
        );
    }
}
