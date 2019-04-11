import gql from 'graphql-tag';

const escape = str => str.replace(/[^a-z_-]/ig, '');

export default ({ entity, code }) => {
    const selectedFields = entity.getFields().map(field => {
        const name = field.getName();
        if (field.isReference()) {
            return `${escape(name)} { code }`;
        }

        return escape(name);
    });

    const queryName = `${entity.getCamelName()}Get`;

    const q = `query {
            ${escape(queryName)}(code: "${escape(code)}") {
                errors {
                    code
                    message
                }
                data {
                    ${selectedFields.join('\n')}
                }
            }
        }`;
	console.dir(q);
    
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
