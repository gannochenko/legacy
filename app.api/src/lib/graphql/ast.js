export const getASTAt = (ast, path = '') => {
    if (!ast || !ast.fieldNodes || !ast.fieldNodes[0]) {
        return null;
    }

    let node = ast.fieldNodes[0];

    if (path.length) {
        path = path.split('.');

        let i = 0;
        for (; i < path.length; i += 1) {
            if (node.selectionSet && node.selectionSet.selections) {
                node = node.selectionSet.selections.find(
                    f => f.name.value === path[i],
                );
            } else {
                break;
            }
        }

        if (i === path.length) {
            // found
            return node;
        }

        return null;
    }

    return node || null;
};

export const getSelectionAt = (ast, path = '') => {
    try {
        return getASTAt(ast, path).selectionSet.selections.map(
            field => field.name.value,
        );
    } catch (e) {
        return {};
    }
};
