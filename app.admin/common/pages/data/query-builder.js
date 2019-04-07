import gql from 'graphql-tag';

export default ({ entity, page, pageSize, sortBy, filter, select }) => {
    const selectedFields = entity.getFields().map(field => {
        const name = field.getName();
        if (field.isReference()) {
            return `${name} { code }`;
        }

        return name;
    });

    const queryName = `${entity.getCamelName()}Find`;
    return gql`
        query {
            ${queryName}(
                limit: 10
                offset: 0
                sort: { full_name: ASC }
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
