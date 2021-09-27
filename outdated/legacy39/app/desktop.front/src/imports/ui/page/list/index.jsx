/* eslint-disable class-methods-use-this */

import React from 'react';
import BasePage from '../../../lib/base/page/page.jsx';
import Layout from '../../component/application-layout/component/page';
import RegistryList from '../../component/registry.list';
import RegistryMap from '../../component/registry.map';
import RegistryFilter from '../../component/registry.filter';

import './style.less';

export default class RegistryPage extends BasePage
{
    // constructor(props) {
    //     super(props);
    //     this.extendState({
    //         type
    //     });
    // }

    getPageTitle()
    {
        return 'Список объектов';
    }

	render()
    {
        const isList = this.props.route.view === 'list';

        return (
            <Layout
                title={this.getPageTitle()}
                central={
                    <div className="registry-page">
                        <RegistryFilter
                            route={this.props.route}
                        />
                        {
                            isList
                            &&
                            <RegistryList />
                        }
                        {
                            !isList
                            &&
                            <RegistryMap />
                        }
                    </div>
                }
            />
        );
    }
}
