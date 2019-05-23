import gql from 'graphql-tag';
import { ENTITY_CODE_FIELD_NAME } from 'project-minimum-core';
import { sanitize } from '../../lib/util';

export const buildQueryFind = ({
    entity,
    page,
    pageSize,
    sort,
    // filter,
    // select,
}) => {
    const selectedFields = entity.getFields().map(field => {
        const name = field.getName();
        if (field.isReference()) {
            return `${sanitize(name)} { ${ENTITY_CODE_FIELD_NAME} }`;
        }

        return sanitize(name);
    });

    const queryName = `${entity.getCamelName()}Find`;
    const query = gql`
        query {
            ${sanitize(queryName)}(
                page: ${parseInt(page, 10)}
                pageSize: ${parseInt(pageSize, 10)}
                ${
                    _.iane(sort)
                        ? `sort: { ${sanitize(sort[0])}: ${sanitize(
                              sort[1],
                          ).toUpperCase()} }`
                        : ''
                }
            ) {
                errors {
                    code
                    message
                }
                data {
                    ${selectedFields.join('\n')}
                }
                count
            }
        }
	`;

    return [queryName, query];
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
