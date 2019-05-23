import gql from 'graphql-tag';
import { sanitize, escapeQuote } from '../../lib/util';
import {
    ENTITY_CODE_FIELD_NAME,
    TYPE_STRING,
    TYPE_DATETIME,
} from 'project-minimum-core';

export const buildQueryLoad = ({ entity, schema, code }) => {
    const selectedFields = entity.getFields().map(field => {
        const name = field.getName();
        if (field.isReference()) {
            let presentField = null;
            const refEntity = schema.getEntity(field.getReferencedEntityName());
            if (refEntity) {
                presentField = refEntity.getPresentationField();
            }

            return `${sanitize(name)} { ${ENTITY_CODE_FIELD_NAME} ${
                presentField ? presentField.getName() : ''
            } }`;
        }

        return sanitize(name);
    });

    const queryName = `${entity.getCamelName()}Get`;
    const query = gql`
        query {
            ${sanitize(queryName)}(code: "${sanitize(code)}") {
                errors {
                    code
                    message
                }
                data {
                    ${selectedFields.join('\n')}
                }
            }
        }        
    `;

    return [queryName, query];
};

export const buildQuerySearch = ({ entity, text }) => {
    const queryName = `${entity.getCamelName()}Find`;
    const presentationalField = entity.getPresentationField();

    const query = gql`
        query {
            ${sanitize(queryName)}(search: "${sanitize(text)}", limit: 5) {
                errors {
                    code
                    message
                }
                data {
                    code
                    ${presentationalField ? presentationalField.getName() : ''}
                }
            }
        }
    `;

    return [queryName, query];
};

export const buildMutationPut = ({ entity, schema, data, code }) => {
    const mutationName = `${entity.getCamelName()}Put`;

    data = entity.prepareData(data);

    // translate to GraphQL presentation
    let dataStr = [];
    entity.getFields().forEach(field => {
        const name = field.getName();
        if (!(name in data)) {
            return;
        }

        let value = data[name];
        const type = field.getActualType();
        if (
            type === TYPE_DATETIME ||
            type === TYPE_STRING ||
            field.isReference()
        ) {
            if (field.isMultiple()) {
                value = value.map(subValue => `"${escapeQuote(subValue)}"`);
            } else {
                value = `"${escapeQuote(value)}"`;
            }
        }

        dataStr.push(
            `${sanitize(name)}: ${
                _.isArray(value) ? `[${value.join(', ')}]` : value
            }`,
        );
    });

    const mutation = gql`
        mutation {
            ${sanitize(mutationName)}(data: {${dataStr.join(', ')}}${
        _.isne(code) && code !== 'new' ? `, code: "${sanitize(code)}"` : ''
    }) {
                data {
                    code
                }
                errors {
                    code
                    message
                }
            }
        }
    `;

    return [mutationName, mutation];
};

export const buildMutationDelete = ({ entity, code }) => {
    const mutationName = `${entity.getCamelName()}Delete`;
    const mutation = gql`
        mutation {
            ${sanitize(mutationName)}(code: "${sanitize(code)}") {
            errors {
                code
                message
            }
        }
        }
    `;

    return [mutationName, mutation];
};
