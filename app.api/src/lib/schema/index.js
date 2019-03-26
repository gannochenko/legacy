import Entity from './entity';
import { DB_CODE_COLUMN_LENGTH } from '../../constants';
import SchemaEntity from '../../entity/schema';
import * as field from './field';

export default class Schema {
    static async load() {
        return new this([
            {
                name: 'important_person',
                schema: [
                    {
                        // a system field
                        name: 'code',
                        type: field.TYPE_STRING,
                        label: 'Code',
                        length: DB_CODE_COLUMN_LENGTH,
                        required: true,
                        unique: true,
                    },
                    {
                        name: 'full_name',
                        type: field.TYPE_STRING,
                        label: 'Full name',
                        required: true,
                    },
                    {
                        name: 'tags',
                        type: [field.TYPE_STRING],
                        label: 'Tags',
                    },
                    {
                        name: 'lucky_numbers',
                        type: [field.TYPE_INTEGER],
                        label: 'Lucky numbers',
                    },
                    {
                        name: 'birth_date',
                        type: field.TYPE_DATETIME,
                        label: 'Birth date',
                    },
                    {
                        name: 'has_pets',
                        type: field.TYPE_BOOLEAN,
                        label: 'Has pets',
                    },
                    {
                        name: 'pets',
                        type: ['pet'],
                        label: 'Pets',
                    },
                    {
                        name: 'tools',
                        type: ['tool'],
                        label: 'Tools',
                    },
                    {
                        name: 'partner',
                        type: 'important_person',
                        label: 'Partner',
                    },
                ],
            },
            {
                name: 'pet',
                schema: [
                    {
                        // a system field
                        name: 'code',
                        type: field.TYPE_STRING,
                        label: 'Code',
                        length: 36,
                        required: true,
                        unique: true,
                    },
                    {
                        name: 'nickname',
                        type: field.TYPE_STRING,
                        label: 'Nickname',
                        required: true,
                    },
                ],
            },
            {
                name: 'tool',
                schema: [
                    {
                        // a system field
                        name: 'code',
                        type: field.TYPE_STRING,
                        label: 'Code',
                        length: 36,
                        required: true,
                        unique: true,
                    },
                    {
                        name: 'name',
                        type: field.TYPE_STRING,
                        label: 'Name',
                        required: true,
                    },
                ],
            },
        ]);
    }

    constructor(declaration) {
        this._schema = declaration.map(entity => new Entity(entity));
    }

    checkHealth() {
        // check health of each entity
        // check that all referenced fields are there
        // todo: check that there are still User and Group entities left intact
    }

    toJSON() {
        return this._schema;
    }

    getEntity(name) {
        return this._schema.find(entity => entity.getName() === name);
    }
}
