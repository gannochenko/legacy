export default class Model {
    /**
     * Make local simple form model from the external complex data source
     * make use of it inside the form
     * @param data
     * @returns {*}
     */
    static extractModel(data) {
        if (data) {

            const flags = [];
            if (data.inDanger)
            {
                flags.push('DANGER');
            }
            if (data._onGoing)
            {
                flags.push('ONGOING');
            }
            if (data._inFavorite)
            {
                flags.push('FAVOURITE');
            }

            return {
                flags,
                status: this.convertIn(data.status),
                kind: this.convertIn(data.kind),
                area: this.convertIn(data.area),
                level: this.convertIn(data.level),
                condition: this.convertIn(data.condition),
                category: this.convertIn(data.category),
            };
        }
        return {};
    }

    /**
     * Merge local form model back to the external data source
     * @param model
     * @param data
     */
    static putModel(model, data = {}) {
        if (!_.isObject(data)) {
            return;
        }

        Object.assign(data, {
            status: this.convertOut(model.status),
            kind: this.convertOut(model.kind),
            area: this.convertOut(model.area),
            level: this.convertOut(model.level),
            condition: this.convertOut(model.condition),
            category: this.convertOut(model.category),
        });

        if (_.contains(model.flags, 'DANGER')) {
            data.inDanger = true;
        }
        if (_.contains(model.flags, 'ONGOING')) {
            data._onGoing = true;
        }
        if (_.contains(model.flags, 'FAVOURITE')) {
            data._inFavorite = true;
        }

        _.forEach(data, (value, key) => {
            if (value === null) {
                delete data[key];
            }
        });

        return data;
    }

    static convertIn(value) {
        if (_.isStringNotEmpty(value)) {
            return [value];
        }

        if (_.isObjectNotEmpty(value) && _.isArrayNotEmpty(value.$in)) {
            return value.$in;
        }

        return [];
    }

    static convertOut(value) {
        if (!_.isArrayNotEmpty(value)) {
            return null;
        }

        return {$in: value};
    }
}
