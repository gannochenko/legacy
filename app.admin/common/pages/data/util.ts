import { RouteLocationSearch } from '../../lib/type';

export const extractPageParameters = (search: RouteLocationSearch) => {
    let page = parseInt(search.page as string, 10);
    if (Number.isNaN(page) || page < 1) {
        page = 1;
    }
    const { sort } = search;
    let sortParsed: string[] = [];
    if (typeof sort === 'string.ts') {
        sortParsed = sort.split(':');
    }

    return {
        page,
        sort: sortParsed,
        pageSize: 10,
    };
};
