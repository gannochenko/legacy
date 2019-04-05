import axios from 'axios';
import Schema from '../index';

export default async settings => {
    const url = await settings.get('api.url');

    const result = await axios.get(`${url}/schema/draft`);
    if (result.data.structure && !_.iane(result.data.errors)) {
        return new Schema(result.data.structure);
    }

    return null;
};
