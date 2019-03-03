export default {
    Query: {
        sampleB: async (source, args, {dataSources}, state) => {
            const { id } = args;
            return 'another stuff';
        },
    },
};
