export default {
    Query: {
        person: async (source, args, { dataSources }, state) => {
            const { id } = args;
            return 'another stuff';
        },
    },
};
