export default class Util {
    static decodeFilter(filter) {
        try {
            return JSON.parse(atob(filter)); // set filter
        } catch (e) {
            return null;
        }
    }

    static encodeFilter(filter) {
        return btoa(JSON.stringify(filter));
    }

    static getFilter() {
        return FlowRouter.getQueryParam('filter');
    }

    // woops
    static getPreset() {
        return FlowRouter.getQueryParam('preset');
    }
}
