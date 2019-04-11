import gql from 'graphql-tag';
import { escape } from '../../lib/util';

export default ({ entity, page, pageSize, sort, filter, select }) => {
    const selectedFields = entity.getFields().map(field => {
        const name = field.getName();
        if (field.isReference()) {
            return `${escape(name)} { code }`;
        }

        return escape(name);
    });

    const queryName = `${entity.getCamelName()}Find`;
    return gql`
        query {
            ${escape(queryName)}(
                page: ${parseInt(page, 10)}
                pageSize: ${parseInt(pageSize, 10)}
                ${_.iane(sort) ? `sort: { ${escape(sort[0])}: ${escape(sort[1]).toUpperCase()} }` : ''}
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
