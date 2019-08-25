export const makeAST = (at = 'data', what = []) => {
    if (at.length) {
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
    } else {
        return {
            fieldNodes: [
                {
                    selectionSet: {
                        selections: what.map(field => ({
                            name: {
                                value: field,
                            },
                        })),
                    },
                },
            ],
        };
    }
};
