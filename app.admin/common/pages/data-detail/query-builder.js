import gql from 'graphql-tag';
import { sanitize } from '../../lib/util';
import { ENTITY_CODE_FIELD_NAME } from '../../../shared/constants';

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

    return gql`
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
};

export const buildQuerySearch = ({ entity, text }) => {
    const queryName = `${entity.getCamelName()}Find`;
    let presentationalField = entity.getPresentationField();

    return gql`
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
};

export const buildMutationPut = ({ entity, schema, data }) => {
    const mutationName = `${entity.getCamelName()}Put`;
    const { code } = data;

    let dataStr = [];
    Object.keys(entity.prepareData(data)).forEach(fieldName => {
        dataStr.push(`${sanitize(fieldName)}: "${''}"`);
    });

    const q = `
        mutation {
            ${sanitize(mutationName)}(data: {${dataStr.join(', ')}}${
        _.isne(code) ? `, code: "${sanitize(code)}"` : ''
    }) {
                errors {
                    code
                    message
                }
            }
        }
    `;
    console.dir(q);

    const mutation = gql`
        mutation {
            ${sanitize(mutationName)}(data: {${dataStr.join(', ')}}${
        _.isne(code) ? `, code: "${sanitize(code)}"` : ''
    }) {
                errors {
                    code
                    message
                }
            }
        }
    `;

    return [mutationName, mutation];
};
