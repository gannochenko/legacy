import axios from 'axios';

export default class Structure {
    static async load(settings) {
        const url = await settings.get('api.url');

        const result = await axios.get(`${url}/schema/draft`);
        if (result.data.structure && !_.iane(result.data.errors)) {
            return new this(result.data.structure);
        }

        return null;
    }

    constructor(struct) {
        this._struct = struct;
    }

    get(name = null) {
        return name ? this._struct.find(e => e.name === name) : this._struct;
    }

    isEmpty() {
        return !this._struct.length;
    }
}
