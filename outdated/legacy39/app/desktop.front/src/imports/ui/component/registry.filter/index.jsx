import React from 'react';
import BaseComponent from '../../../lib/base/component/component.jsx';
import presetEnum from '../registry.list.base/filter/preset.enum.js';
import Modal from '../general/etc/modal';
import RegistryFilterPanel from './component/registry.filter.panel';
import FilterUtil from '../../../lib/base/list-component/filter/util.js';
import User from '../../../api/user/entity/entity.client.js';

import PropTypes from 'prop-types';
import './style.less';

export default class RegistryFilter extends BaseComponent
{
    static propTypes = {
        className: PropTypes.string,
        onFilterChange: PropTypes.func,
    };

    static defaultProps = {
        className: '',
        onFilterChange: null,
    };

    constructor(props)
    {
        super(props);
        this.extendState({
            filterOpened: false,
        });
    }

    onPresetClick(preset) {
        this.fire('filter-preset-change', [preset]);
    }

    onFilterOpen() {
        this.setState({
            filterOpened: true,
        });
    }

    onFilterApply(filter) {
        this.fire('filter-change', [filter]);
        this.closeFilter();
    }

    onFilterClose() {
        this.closeFilter();
    }

    closeFilter()
    {
        this.setState({
            filterOpened: false,
        });
    }

    getSelectedPreset()
    {
        let pParam = FilterUtil.getPreset();
        if (_.isStringNotEmpty(pParam)) {
            pParam = pParam.toUpperCase();
            if (presetEnum.isLegalKey(pParam)) {
                return pParam;
            }
        }

        return null;
    }

    getSelectedFilter()
    {
        let filter = FilterUtil.getFilter();
        if (_.isStringNotEmpty(filter)) {
            return FilterUtil.decodeFilter(filter) || {};
        }

        return {};
    }

    isFilterSelected()
    {
        return _.isStringNotEmpty(FilterUtil.getFilter());
    }

    getLink(view) {
        let url = this.getApplication().getRegistryUrl({view});

        const params = [];
        const preset = FilterUtil.getPreset();
        if (_.isStringNotEmpty(preset)) {
            params.push(`preset=${preset}`);
        }

        const filter = FilterUtil.getFilter();
        if (_.isStringNotEmpty(filter)) {
            params.push(`filter=${filter}`);
        }

        if (_.isArrayNotEmpty(params)) {
            url = `${url}?${params.join('&')}`;
        }

        return url;
    }

    render() {
        const isMap = this.props.route.view !== 'list';

        let preset = this.getSelectedPreset();
        let filter = false;
        if (!preset) {
            filter = this.isFilterSelected();
        }

        if (!preset && !filter) {
            preset = presetEnum.KEY_ACTUAL;
        }

        return (
            <div className="registry-filter__buttons rb-margin-b_x2">
                <div className="grid-x grid-margin-y">
                    <div className="cell medium-9 small-12">
                        <div className="rb-group_x">
                            {
                                presetEnum.map((item) => {

                                    if (item.authorized === true && !User.get()) {
                                        return null;
                                    }

                                    if (item.needEditor === true && !User.isEditor()) {
                                        return null;
                                    }

                                    return (
                                        <a
                                            className={`pl-button ${preset === item.key ? '' : 'pl-button_inactive'}`}
                                            onClick={this.onPresetClick.bind(this, item.key)}
                                            key={item.key}
                                        >
                                            {item.value}
                                        </a>
                                    );
                                })
                            }
                            <a className={`pl-button ${filter ? '' : 'pl-button_inactive'}`} onClick={this.onFilterOpen.bind(this)}>
                                <span className="rb-icon-label rb-icon-code_tune registry-filter__button-filter">Фильтр</span>
                            </a>
                        </div>
                    </div>
                    <div className="cell medium-3 small-12">
	                    <div className="rb-align_mr rb-align_ml_small pl-button-group">
		                    <a className={`pl-button ${!isMap ? 'pl-button_inactive' : ''}`} href={this.getLink('map')}>Карта</a>
		                    <a className={`pl-button ${isMap ? 'pl-button_inactive' : ''}`} href={this.getLink('list')}>Список</a>
	                    </div>
                    </div>
                </div>

                {
                    this.state.filterOpened
                    &&
                    <Modal
                        onClose={this.onFilterClose.bind(this)}
                        useContentPadding={false}
                    >
                        <RegistryFilterPanel
                            data={this.getSelectedFilter()}
                            onCancel={this.onFilterClose.bind(this)}
                            onApply={this.onFilterApply.bind(this)}
                        />
                    </Modal>
                }
            </div>
        );
    }
}
