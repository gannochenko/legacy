export const getSelectionAt = (ast, path) => {
    path = path.split('.');
    let pos = _.get(ast, 'fieldNodes.0');

    let i = 0;
    for (; i < path.length; i++) {
        if (pos.selectionSet && pos.selectionSet.selections) {
            pos = pos.selectionSet.selections.find(
                f => f.name.value === path[i],
            );
        } else {
            break;
        }
    }

    if (i === path.length) {
        // found
        return pos;
    }

    // not found
    return null;
};