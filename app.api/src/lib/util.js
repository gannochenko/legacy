import { camel } from 'naming-style';

export const injectPassword = (url, password = null) => {
    if (_.isne(password)) {
        const oUrl = new URL(url);
        oUrl.password = password;

        url = oUrl.toString();
    }

    return url;
};

export const decomposeURL = url => {
    const oUrl = new URL(url);

    const parts = {
        host: oUrl.hostname,
        port: oUrl.port,
        password: oUrl.password,
    };

    if (!_.isne(parts.host)) {
        // invalid url
        return null;
    }

    if (Number.isNaN(parts.port)) {
        delete parts.port;
    }

    return parts;
};

/**
 * @deprecated
 * @param str
 * @returns {string}
 */
export const convertToCamel = str => {
    str = camel(str.toLowerCase());
    return `${str.substr(0, 1).toUpperCase()}${str.substr(1, str.length - 1)}`;
};
