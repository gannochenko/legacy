import gql from 'graphql-tag';
import { sanitize, escapeQuote } from '../../lib/util';
import {
    ENTITY_ID_FIELD_NAME,
    FIELD_TYPE_STRING,
    FIELD_TYPE_DATETIME,
} from 'project-minimum-core';

export const buildQueryLoad = ({ entity, schema, id }) => {
    const selectedFields = entity.getFields().map(field => {
        const name = field.getName();
        if (field.isReference()) {
            let presentField = null;
            const refEntity = schema.getEntity(field.getReferencedEntityName());
            if (refEntity) {
                presentField = refEntity.getPreviewField();
            }

            return `${sanitize(name)} { ${ENTITY_ID_FIELD_NAME} ${
                presentField ? presentField.getName() : ''
            } }`;
        }

        return sanitize(name);
    });

    const queryName = `${entity.getCamelName()}Get`;
    const query = gql`
        query {
            ${sanitize(queryName)}(${ENTITY_ID_FIELD_NAME}: "${sanitize(id)}") {
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
    const presentationalField = entity.getPreviewField();

    const query = gql`
        query {
            ${sanitize(queryName)}(search: "${sanitize(text)}", limit: 5) {
                errors {
                    code
                    message
                }
                data {
                    ${ENTITY_ID_FIELD_NAME}
                    ${presentationalField ? presentationalField.getName() : ''}
                }
            }
        }
    `;

    return [queryName, query];
};

export const buildMutationPut = ({ entity, schema, data, code }) => {
    const mutationName = `${entity.getCamelName()}Put`;

    data = entity.castData(data);

    // translate to GraphQL presentation
    const dataStr = [];
    entity.getFields().forEach(field => {
        const name = field.getName();
        if (!(name in data)) {
            return;
        }

        let value = data[name];
        const type = field.getActualType();
        if (
            type === FIELD_TYPE_DATETIME ||
            type === FIELD_TYPE_STRING ||
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
        _.isne(code) && code !== 'new'
            ? `, ${ENTITY_ID_FIELD_NAME}: "${sanitize(code)}"`
            : ''
    }) {
                data {
                    ${ENTITY_ID_FIELD_NAME}
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
            ${sanitize(mutationName)}(${ENTITY_ID_FIELD_NAME}: "${sanitize(
        code,
    )}") {
            errors {
                code
                message
            }
        }
        }
    `;

    return [mutationName, mutation];
};
