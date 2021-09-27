/* eslint-disable class-methods-use-this */

import React from 'react';
import BasePage from '../../../lib/base/page/page.jsx';

import Layout from '../../component/application-layout/component/page';

export default class ForbiddenPage extends BasePage
{
    getPageTitle()
    {
        return '403';
    }

    render()
    {
        return (
            <Layout
                title={this.getPageTitle()}
                central={"Forbidden (403)"}
            />
        );
    }
}
