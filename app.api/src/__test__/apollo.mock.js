export const makeAST = (at = 'data', what = []) => {
    return {
        fieldNodes: [
            {
                selectionSet: {
                    selections: [
                        {
                            name: {
                                value: at,
                            },
                            selectionSet: {
                                selections: what.map(field => ({
                                    name: {
                                        value: field,
                                    },
                                })),
                            },
                        },
                    ],
                },
            },
        ],
    };
};
