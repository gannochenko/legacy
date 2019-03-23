export default class GQLGenerator {
    static async make({ schemaProvider }) {
        return Object.values(await schemaProvider.get()).map(entity =>
            this.makeForEntity(entity, schemaProvider),
        );
    }

    /**
     * @private
     * @param entity
     * @param schemaProvider
     * @returns {string}
     */
    static makeForEntity(entity, schemaProvider) {
        const nameCamel = schemaProvider.getCamelEntityName(entity.name);

        const tFields = [];
        const iFields = [];
        const fFields = [];
        const sFields = [];
        entity.schema.forEach(field => {
            tFields.push(
                `${this.getQueryFieldName(
                    field,
                    schemaProvider,
                )}: ${this.getType(field, schemaProvider)}`,
            );
            iFields.push(
                `${field.name}: ${this.getType(field, schemaProvider, true)}${
                    false && field.required ? '!' : ''
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

    static getType(field, schemaProvider, input = false) {
        let { type } = field;
        let multiple = false;
        if (schemaProvider.isMultipleField(field)) {
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
            gqlType = input
                ? `String`
                : schemaProvider.getCamelEntityName(type);
        }

        if (multiple) {
            gqlType = `[${gqlType}]`;
        }

        return gqlType;
    }

    static getQueryFieldName(field, schemaProvider) {
        const refName = schemaProvider.getReferenceFieldName(field);
        if (refName && schemaProvider.isMultipleField(field)) {
            const refEntityName = schemaProvider.getCamelEntityName(refName);
            return `${field.name}(
                filter: I${refEntityName}Filter
                sort: I${refEntityName}Sort
                limit: Int
                offset: Int
            )`;
        }

        return field.name;
    }
}
