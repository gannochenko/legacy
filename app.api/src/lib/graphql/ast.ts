export interface ASTNode {
    fieldNodes: ASTNode[];
    selectionSet: {
        selections: ASTNode[];
    };
    name: {
        value: string;
    };
}

export const getASTAt = (ast: Nullable<ASTNode> = null, path = '') => {
    if (!ast || !ast.fieldNodes || !ast.fieldNodes[0]) {
        return null;
    }

    let node = ast.fieldNodes[0];

    if (path.length) {
        const pathParts = path.split('.');

        let i = 0;
        for (; i < pathParts.length; i += 1) {
            if (node.selectionSet && node.selectionSet.selections) {
                const subNode = node.selectionSet.selections.find(
                    // eslint-disable-next-line no-loop-func
                    childNode => childNode.name.value === pathParts[i],
                );
                if (subNode) {
                    node = subNode as ASTNode;
                } else {
                    return null;
                }
            } else {
                break;
            }
        }

        if (i === pathParts.length) {
            // found
            return node;
        }

        return null;
    }

    return node || null;
};

export const getSelectionAt = (ast: Nullable<ASTNode>, path = '') => {
    try {
        const node = getASTAt(ast, path);
        if (node) {
            return node.selectionSet.selections.map(field => field.name.value);
        }

        return {};
    } catch (e) {
        return {};
    }
};
