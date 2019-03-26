import Field from './field';
import { convertToCamel } from '../util';

export default class Entity {
    constructor(declaration) {
        this._schema = {
            name: declaration.name,
            schema: declaration.schema.map(field => new Field(field)),
        };
    }

    checkHealth() {

    }

    getName() {
        return this._schema.name;
    }

    getCamelName() {
        return convertToCamel(this.getName().toLowerCase());
    }

    toJSON() {
        return this._schema;
    }
}
