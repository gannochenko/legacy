import {
    FIELD_TYPE_STRING,
    FIELD_TYPE_BOOLEAN,
    FIELD_TYPE_DATETIME,
    FIELD_TYPE_INTEGER,
    ENTITY_ID_FIELD_NAME,
} from 'project-minimum-core';

export default class TypeGenerator {
    static make(schema) {
        const entities = Object.values(schema.getSchema());
        if (!entities.length) {
            return [];
        }

        return entities.map(entity => this.makeForEntity(entity, schema));
    }

    /**
     * @private
     * @param entity
     * @param schema
     * @returns {string}
     */
    static makeForEntity(entity, schema) {
        const name = entity.getCamelName();

        const tFields = [];
        const iFields = [];
        const fFields = [];
        const sFields = [];
        entity.getFields().forEach(field => {
            tFields.push(
                `${this.getQueryFieldName(
                    field,
                    schema,
                )}: ${this.getGQLFieldType(field, schema)}`,
            );
            const fieldName = field.getName();
            if (fieldName !== ENTITY_ID_FIELD_NAME) {
                // code is a read-only field
                iFields.push(
                    `${field.getName()}: ${this.getGQLFieldType(
                        field,
                        schema,
                        true,
                    )}${false && field.isRequired() ? '!' : ''}`,
                );
            }
            fFields.push(`${fieldName}: IFilterFieldValue`);
            sFields.push(`${fieldName}: SortOrder`);
        });

        return `
type ${name}Result {
    errors: [Error]
    data: ${name}
}

type ${name}SearchResult {
    errors: [Error]
    data: [${name}]!
    limit: Int!
    offset: Int!
    count: Int
}

type ${name} {
${tFields.map(x => `    ${x}`).join('\n')}
}

input I${name} {
${iFields.map(x => `    ${x}`).join('\n')}
}

input I${name}Filter {
    SYSLogic: FilterLogic
    SYSSubFilter: [I${name}Filter]
${fFields.map(x => `    ${x}`).join('\n')}
}

input I${name}Sort {
${sFields.map(x => `    ${x}`).join('\n')}
}

type Query {
    ${name}Get(${ENTITY_ID_FIELD_NAME}: String!): ${name}Result
    ${name}Find(
        filter: I${name}Filter
        search: String
        sort: I${name}Sort
        limit: Int
        offset: Int
        page: Int
        pageSize: Int
        count: Boolean
    ): ${name}SearchResult
}

type Mutation {
    ${name}Delete(${ENTITY_ID_FIELD_NAME}: String!): ${name}Result
    ${name}Put(${ENTITY_ID_FIELD_NAME}: String, data: I${name}!): ${name}Result
}
        `;
    }

    static getGQLFieldType(field, schema, input = false) {
        let gqlType = 'String';
        if (field.isReference()) {
            // reference, for input we accept codes, for types - just put type
            if (input) {
                gqlType = 'String';
            } else {
                const referencedEntityName = field.getReferencedEntityName();
                const referencedEntity = schema.getEntity(referencedEntityName);
                gqlType = referencedEntity.getCamelName();
            }
        } else {
            const type = field.getActualType();
            switch (type) {
                case FIELD_TYPE_STRING:
                    gqlType = 'String';
                    break;
                case FIELD_TYPE_INTEGER:
                    gqlType = 'Int';
                    break;
                case FIELD_TYPE_DATETIME:
                    gqlType = 'String';
                    break;
                case FIELD_TYPE_BOOLEAN:
                    gqlType = 'Boolean';
                    break;
                default:
                    gqlType = 'String';
            }
        }

        if (field.isMultiple()) {
            gqlType = `[${gqlType}]`;
        }

        return gqlType;
    }

    static getQueryFieldName(field, schema) {
        if (field.isReference() && field.isMultiple()) {
            const referencedEntityName = field.getReferencedEntityName();
            const referencedEntity = schema.getEntity(referencedEntityName);
            const referencedEntityNameCamel = referencedEntity.getCamelName();
            return `${field.getName()}(
                filter: I${referencedEntityNameCamel}Filter
                sort: I${referencedEntityNameCamel}Sort
                limit: Int
                offset: Int
                page: Int
                pageSize: Int
                count: Int
            )`;
        }

        return field.getName();
    }
}
