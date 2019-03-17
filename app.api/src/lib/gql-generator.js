import { convertToCamel } from '../lib/util';

export default class GQLGenerator {
    static make({ entities }) {
        return entities.map(entity => this.makeOne({ entity }));
    }

    static makeOne({ entity }) {
        const nameCamel = this.transformName(entity.name);

        const tFields = [];
        const iFields = [];
        const fFields = [];
        const sFields = [];
        entity.schema.forEach(field => {
            tFields.push(
                `${this.getQueryFieldName(field)}: ${this.getType(field)}`,
            );
            iFields.push(
                `${field.name}: ${this.getType(field, true)}${
                    false && this.getRequired(field) ? '!' : ''
                }`,
            );
            fFields.push(`${field.name}: IFilterFieldValue`);
            sFields.push(`${field.name}: SortOrder`);
        });

        return `
type ${nameCamel}Result {
    errors: [Error]
    data: ${nameCamel}!
}

type ${nameCamel}SearchResult {
    errors: [Error]
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

input I${nameCamel}Filter {
    SYSLogic: FilterLogic
    SYSSubFilter: [I${nameCamel}Filter]
${fFields.map(x => `    ${x}`).join('\n')}
}

input I${nameCamel}Sort {
${sFields.map(x => `    ${x}`).join('\n')}
}

type Query {
    ${nameCamel}Get(code: String!): ${nameCamel}Result
    ${nameCamel}Find(
        filter: I${nameCamel}Filter
        sort: I${nameCamel}Sort
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

    static getType(field, input = false) {
        let { type } = field;
        let multiple = false;
        if (this.isMultipleField(field)) {
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
        } else if (_.isne(type)) {
            // reference, for input we accept codes, for types - just put type
            gqlType = input ? `String` : this.transformName(type);
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

    static transformName(entityName) {
        return convertToCamel(entityName.toLowerCase());
    }

    static getQueryFieldName(field) {
        const refName = this.getReferenceFieldName(field);
        if (refName && this.isMultipleField(field)) {
            const refEntityName = this.transformName(refName);
            return `${field.name}(
                filter: I${refEntityName}Filter
                sort: I${refEntityName}Sort
                limit: Int
                offset: Int
            )`;
        }

        return field.name;
    }

    static getReferenceFieldName(field) {
        if (this.isMultipleField(field) && _.isne(field.type[0])) {
            return field.type[0];
        }

        return _.isne(field.type) ? field.type : null;
    }

    static isMultipleField(field) {
        return _.isArray(field.type);
    }
}
