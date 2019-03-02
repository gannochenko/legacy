export default {
    Query: {
        sample: async (source, args, {dataSources}, state) => {
            const { id } = args;
            return 'test';
        },
    },
};
