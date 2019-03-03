export default class GQLGenerator {
    static make(entity) {
        const name = entity.name;
        const nameLC = name.toLowerCase();

        const tFields = [];
        const iFields = [];
        entity.schema.forEach(field => {
            tFields.push(`${field.name}: ${this.getType(field)}`);
            iFields.push(
                `${field.name}: ${this.getType(field)}${
                    field.required ? '!' : ''
                }`,
            );
        });

        return `      
type ${name}Result {
    errors: [String]
    code: String!
    data: ${name}!
}

type ${name}SearchResult {
    errors: [String]
    data: [${name}]!
    limit: Int!
    offset: Int!
    count: Int
}

type ${name} {
    code: String
${tFields.map(x => `    ${x}`).join('\n')}
}

input I${name} {
    code: String!
${iFields.map(x => `    ${x}`).join('\n')}
}

type Query {
    ${nameLC}Get(code: String!): ${name}
    ${nameLC}Find(
        filter: String
        sort: String
        select: [String]
        limit: Int
        offset: Int
        count: Boolean
    ): ${name}SearchResult
}

type Mutation {
    ${nameLC}Delete(code: String!): ${name}Result
    ${nameLC}Put(code: String, data: I${name}!): ${name}Result
}        
        `;
    }

    static getType({ type, entity, multiple }) {
        let gqlType = 'String';
        if (type === String) {
            gqlType = 'String';
        } else if (type === Number) {
            gqlType = 'Int';
        } else if (type === Boolean) {
            gqlType = 'Boolean';
        } else if (type === Date) {
            gqlType = 'String';
        } else if (type === 'reference') {
            gqlType = entity;
        }

        if (multiple) {
            gqlType = `[${gqlType}]`;
        }

        return gqlType;
    }
}
