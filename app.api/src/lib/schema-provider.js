import { DB_CODE_COLUMN_LENGTH } from '../constants';
import { DB_VARCHAR_DEF_LENGTH } from '../constants';
import { convertToCamel } from './util';

/**
 * todo: this class should produce complex object, with prototypes
 */
export default class SchemaProvider {
    async get() {
        return [
            {
                name: 'important_person',
                schema: [
                    {
                        // a system field
                        name: 'code',
                        type: String,
                        label: 'Code',
                        length: DB_CODE_COLUMN_LENGTH,
                        required: true,
                        // inputRequired: false,
                        unique: true,
                        validate: () => {},
                    },
                    {
                        name: 'full_name',
                        type: String,
                        label: 'Full name',
                        required: true,
                        validate: () => {},
                    },
                    {
                        name: 'tags',
                        type: [String],
                        label: 'Tags',
                        validate: () => {},
                    },
                    {
                        name: 'lucky_numbers',
                        type: [Number],
                        label: 'Lucky numbers',
                        validate: () => {},
                    },
                    {
                        name: 'birth_date',
                        type: Date,
                        label: 'Birth date',
                        validate: () => {},
                    },
                    {
                        name: 'has_pets',
                        type: Boolean,
                        label: 'Has pets',
                        validate: () => {},
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
                        type: String,
                        label: 'Code',
                        length: 36,
                        required: true,
                        unique: true,
                        validate: () => {},
                    },
                    {
                        name: 'nickname',
                        type: String,
                        label: 'Nickname',
                        required: true,
                        validate: () => {},
                    },
                ],
            },
            {
                name: 'tool',
                schema: [
                    {
                        // a system field
                        name: 'code',
                        type: String,
                        label: 'Code',
                        length: 36,
                        required: true,
                        unique: true,
                        validate: () => {},
                    },
                    {
                        name: 'name',
                        type: String,
                        label: 'Name',
                        required: true,
                        validate: () => {},
                    },
                ],
            },
        ];
    }

    async getByName(name) {
        const all = await this.get();
        return all.find(entity => entity.name === name);
    }

    getFieldType(field) {
        let type = field.type;

        if (_.isArray(type)) {
            type = type[0] || String;
        }

        if (_.isne(type)) {
            // reference
            type = Number;
        }

        return type;
    }

    getFieldLength(field) {
        if (field.type === String) {
            const length = parseInt(field.length, 10);
            if (isNaN(length)) {
                return DB_VARCHAR_DEF_LENGTH;
            }

            return length;
        }

        return null;
    }

    /**
     * todo: rename to "getReferencedEntityName"
     * @param field
     * @returns {*}
     */
    getReferenceFieldName(field) {
        if (this.isMultipleField(field) && _.isne(field.type[0])) {
            return field.type[0];
        }

        return _.isne(field.type) ? field.type : null;
    }

    isMultipleField(field) {
        return _.isArray(field.type);
    }

    getCamelEntityName(entityName) {
        return convertToCamel(entityName.toLowerCase());
    }
}
