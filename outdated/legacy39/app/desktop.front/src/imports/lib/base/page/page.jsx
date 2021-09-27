import React from 'react';
import BaseComponent from '../component/component.jsx';
import PropTypes from 'prop-types';
import {DocHead} from 'meteor/kadira:dochead';

import Option from '../../../api/option/entity/entity.client.js';

export default class BasePage extends BaseComponent
{
    static propTypes = {
        title: PropTypes.string,
    };

    static defaultProps = {
        title: '',
    };

    componentWillMount()
    {
        super.componentWillMount();

        this.on('set-title', this.onSetTitle.bind(this));

        this.setDocumentTitle(this.makeTitle(this.getPageTitle()));
        this.setDescription(this.getPageDescription());
        this.setKeywords(this.getPageKeywords());
    }

    getApplicationTitle()
    {
        const title = Option.findOnePublished({name: 'application.title'});
        if (title && _.isStringNotEmpty(title.getValue()))
        {
            return title.getValue();
        }

        return 'New application';
    }

    /**
     * The page title can be also updated at the runtime by calling this.fire('set-title', 'New title'); on any
     * component derived from BaseComponent
     * @returns {string}
     */
    getPageTitle()
    {
        return 'New page';
    }

    getPageDescription()
    {
        const description = Option.findOnePublished({name: 'application.description'});
        if (description && _.isStringNotEmpty(description.getValue()))
        {
            return description.getValue();
        }

        return 'My brand new application';
    }

    getPageKeywords()
    {
        const keywords = Option.findOnePublished({name: 'application.keywords'});
        if (keywords && _.isArrayNotEmpty(keywords.getValue()))
        {
            return keywords.getValue();
        }

        return [];
    }

    onSetTitle(title)
    {
        this.setDocumentTitle(this.makeTitle(title));
    }

    setDocumentTitle(title = '')
    {
        if (title.length > 0)
        {
            title = `${title} – ${this.getApplicationTitle()}`;
        }

        DocHead.setTitle(title);
    }

    setDescription(text = '')
    {
        DocHead.addMeta({
            name: "description",
            content: _.isStringNotEmpty(text) ? text : this.getPageTitle(),
        });
    }

    // todo: move to the page logic
    setKeywords(keywords = [])
    {
        let kw = [];
        if (_.isArrayNotEmpty(keywords))
        {
            kw = keywords;
        }

        DocHead.addMeta({
            name: "keywords",
            content: kw.join(', '),
        });
    }

    makeTitle(title = '')
    {
        if (_.isStringNotEmpty(title))
        {
            return title.replace(/#DASH#/g, '–');
        }

        return '';
    }
}
