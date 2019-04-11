import gql from 'graphql-tag';
import { escape } from '../../lib/util';

export default ({ entity, code }) => {
    const selectedFields = entity.getFields().map(field => {
        const name = field.getName();
        if (field.isReference()) {
            return `${escape(name)} { code }`;
        }

        return escape(name);
    });

    const queryName = `${entity.getCamelName()}Get`;
    
    return gql`
        query {
            ${escape(queryName)}(code: "${escape(code)}") {
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
