/* eslint-disable class-methods-use-this */

import React from 'react';
import BasePage from '../../../lib/base/page/page.jsx';
import Layout from '../../component/application-layout/component/page/index.jsx';
// import List from './component/list/list.jsx';

import User from '../../../api/user/entity/entity.client.js';
import ObjectCardList from '../../component/object-card.list/index.jsx';
import filterPresets from '../../component/registry.list.base/filter/preset.enum.js';

export default class HomePage extends BasePage
{
    getPageTitle()
    {
        return 'Главная';
    }

	render()
    {
        return (
            <Layout
                title={this.getPageTitle()}
                showHeader={false}
                central={
                    <div className="rb-group_x2">
                        {
                            _.isObjectNotEmpty(User.get())
                            &&
                            <ObjectCardList
                                title="Избранные объекты"
                                classNameTitle="rb-i-icon-code_favorite-border"
                                filter={filterPresets.getItemByKey(filterPresets.KEY_FAVOURITE).filter()}
                                showAddButton
                            />
                        }
	                    <ObjectCardList
		                    title="Объекты в опасности"
		                    classNameTitle="rb-i-icon-code_notification_important"
		                    filter={filterPresets.getItemByKey(filterPresets.KEY_DANGER).filter}
	                    />
                    </div>
                }
            />
        );
    }
}
