import React from 'react';
import ListComponent from '../../../lib/base/list-component/index.jsx';
import RegistryObject from '../../../api/registry.object/entity/entity.client.js';
import filterSettings from './filter/index.js';
import presetEnum from './filter/preset.enum.js';
import User from '../../../api/user/entity/entity.client.js';

export default class RegistryListBase extends ListComponent
{
    getEntity()
    {
        return RegistryObject;
    }

    getFilterSettings() {
        return filterSettings;
    }

    componentDidMount() {
        super.componentDidMount();
        this.on('filter-preset-change', (preset) => {
            this.saveFilter(null);
            this.setPreset(preset);

            this.putFilterToUrl();
            this.loadData();
        });
        this.on('filter-change', (filter) => {
            this.saveFilter(filter);
            this.setPreset(null);

            this.putFilterToUrl();
            this.loadData();
        });
    }

    getSavedFilter() {
        let filter = null;
        if (this.getPreset()) {
            filter = this.getFilterByPreset(this.getPreset());
        } else if(this._filter) {
            filter = this.getFilterByPanel(this._filter);
        }
        
        return this.validateFilter(filter);
    }

    setPreset(preset) {
        this._preset = preset;
    }

    getPreset() {
        return this._preset;
    }

    extractFilterFromUrl() {
        let preset = FlowRouter.getQueryParam('preset');
        if (_.isStringNotEmpty(preset)) {
            preset = preset.toUpperCase();
            if (this.getPresetEnum().isLegalKey(preset)) {
                this.setPreset(preset); // set preset
                return null; // unset filter
            }
        }

        let filter = this.getFilterUrlParameter();
        if (_.isStringNotEmpty(filter)) {
            this.setPreset(null); // unset preset
            try {
                return this.decodeFilter(filter); // set filter
            } catch (e) {
                return null;
            }
        }

        // set actual by default
        this.setPreset(presetEnum.KEY_ACTUAL);
        return null;
    }

    getFilterFromURL()
    {
        return this.extractFilterFromUrl();
    }

    putFilterToUrl() {
        if (_.isStringNotEmpty(this.getPreset())) {
            FlowRouter.setQueryParams({
                preset: this.getPreset().toLowerCase(),
                filter: null,
                page: null,
            });
        } else {
            FlowRouter.setQueryParams({
                preset: null,
                filter: this.encodeFilter(this._filter),
                page: null,
            });
        }
    }

    getFilterByPanel(filter)
    {
        filter = _.deepClone(filter);

        let ids = [];
        let hasSomething = false;
        if (filter._inFavorite) {
            ids = _.union(ids, User.get().getObjectFavorite());
            delete filter._inFavorite;

            hasSomething = true;
        }
        if (filter._onGoing) {
            ids = _.union(ids, User.get().getObjectOnGoing());
            delete filter._onGoing;

            hasSomething = true;
        }

        if (hasSomething) {
            filter._id = {$in: ids};
        }

        return filter;
    }

    getFilterByPreset(preset) {
        const item = this.getPresetEnum().getItemByKey(preset);
        if (_.isObjectNotEmpty(item)) {
            if (_.isPlainObject(item.filter)) {
                return item.filter;
            } else if (_.isFunction(item.filter)) {
                return item.filter();
            }
        }

        return null;
    }

    getPresetEnum()
    {
        return presetEnum;
    }

    async getFilterConstant() {
        if (User.isEditor()) {
            return {};
        }

        return {
            hidden: {$ne: true},
        };
    }
}
