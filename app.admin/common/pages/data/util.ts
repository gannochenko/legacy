export const extractPageParameters = search => {
    let page = parseInt(search.page, 10);
    if (Number.isNaN(page) || page < 1) {
        page = 1;
    }
    let { sort } = search;
    if (_.isne(sort)) {
        sort = sort.split(':');
    } else {
        sort = [];
    }

    return {
        page,
        sort,
        pageSize: 10,
    };
};
