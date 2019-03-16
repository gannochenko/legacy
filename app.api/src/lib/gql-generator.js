import { convertToCamel } from '../lib/util';
import { ENTITY_TYPE_REFERENCE } from '../constants';

export default class GQLGenerator {
    static makeOne({ entity }) {
        const nameCamel = convertToCamel(entity.name.toLowerCase());

        const tFields = [];
        const iFields = [];
        entity.schema.forEach(field => {
            tFields.push(`${field.name}: ${this.getType(field)}`);
            iFields.push(
                `${field.name}: ${this.getType(field, true)}${
                    this.getRequired(field) ? '!' : ''
                }`,
            );
        });

        return `
type ${nameCamel}Result {
    errors: [Error]
    data: ${nameCamel}!
}

type ${nameCamel}SearchResult {
    errors: [String]
    data: [${nameCamel}]!
    limit: Int!
    offset: Int!
    count: Int
}

type ${nameCamel} {
${tFields.map(x => `    ${x}`).join('\n')}
}

input I${nameCamel} {
${iFields.map(x => `    ${x}`).join('\n')}
}

type Query {
    ${nameCamel}Get(code: String!): ${nameCamel}
    ${nameCamel}Find(
        filter: String
        sort: String
        select: [String]
        limit: Int
        offset: Int
        count: Boolean
    ): ${nameCamel}SearchResult
}

type Mutation {
    ${nameCamel}Delete(code: String!): ${nameCamel}Result
    ${nameCamel}Put(code: String, data: I${nameCamel}!): ${nameCamel}Result
}
        `;
    }

    static getType({ type, entity }, input = false) {
        let multiple = false;
        if (_.isArray(type)) {
            multiple = true;
            type = type[0];
        }

        let gqlType = 'String';
        if (type === String) {
            gqlType = 'String';
        } else if (type === Number) {
            gqlType = 'Int';
        } else if (type === Boolean) {
            gqlType = 'Boolean';
        } else if (type === Date) {
            gqlType = 'String';
        } else if (type === ENTITY_TYPE_REFERENCE) {
            gqlType = input ? `String` : entity;
        }

        if (multiple) {
            gqlType = `[${gqlType}]`;
        }

        return gqlType;
    }

    static getRequired(field) {
        if ('inputRequired' in field) {
            return field.inputRequired;
        }

        return field.required;
    }
}
