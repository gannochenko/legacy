const BUILDING_LIST = '/spisok-objektov';

module.exports = {
    BUILDING_LIST,
    BUILDING_LIST_TO_DEMOLISH: `${BUILDING_LIST}/budut-sneseny`,
    BUILDING_LIST_SAVED: `${BUILDING_LIST}/vozmozno-spaseny`,
    BUILDING_LIST_OUTSTANDING: `${BUILDING_LIST}/vydausiesa`,
    BUILDING_LIST_LOST: `${BUILDING_LIST}/sneseny`,
    BUILDING_DETAIL: '/doma/#SLUG#/',
    ABOUT: '/o-proekte',
    MAP: '/karta',
    CONTACTS: '/contact',

    fillTemplate: (template, values) => {
        let result = template;

        if (values) {
            Object.keys(values).forEach((key) => {
                const value = values[key];
                result = result
                    .replace(`#${key}#`, value)
                    .replace(`#${key.toUpperCase()}#`, value);
            });
        }

        return result;
    },
};
