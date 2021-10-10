/* eslint-disable class-methods-use-this */

import React from 'react';
import BasePage from '../../../lib/base/page/page.jsx';
import Layout from '../../component/application-layout/component/page';

import RichBlock from '../../component/general/rich-block';

import './style.less';

export default class PrivacyPolicyPage extends BasePage
{
    getPageTitle()
    {
        return 'Политика конфиденциальности';
    }

    onToggleEditModeClick()
    {
        this.setState({
            editMode: !this.state.editMode,
        });
    }

	render()
	{
		return (
            <Layout
                title={this.getPageTitle()}
                central={
                    <div
                        className="article-detail page-content"
                    >
                        Тут однажды появится наша политика конфиденциальности. А пока ее нет, вы автоматически соглашаетесь с нашей тиранией и диктатурой пролетариата.
                    </div>
                }
            />
        );
	}
}
