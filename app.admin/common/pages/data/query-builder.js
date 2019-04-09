import gql from 'graphql-tag';

export default ({ entity, page, pageSize, sortBy, filter, select }) => {
    const selectedFields = entity.getFields().map(field => {
        const name = field.getName();
        if (field.isReference()) {
            return `${name} { code }`;
        }

        return name;
    });

    console.dir(page);
    console.dir(pageSize);

    const queryName = `${entity.getCamelName()}Find`;
    return gql`
        query {
            ${queryName}(
                page: ${page}
                pageSize: ${pageSize}
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
