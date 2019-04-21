import gql from 'graphql-tag';
import { sanitize } from '../../lib/util';
import { ENTITY_CODE_FIELD_NAME } from '../../../shared/constants';

export default ({ entity, page, pageSize, sort, filter, select }) => {
    const selectedFields = entity.getFields().map(field => {
        const name = field.getName();
        if (field.isReference()) {
            return `${sanitize(name)} { ${ENTITY_CODE_FIELD_NAME} }`;
        }

        return sanitize(name);
    });

    const queryName = `${entity.getCamelName()}Find`;
    return gql`
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
};
