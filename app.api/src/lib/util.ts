import { camel } from 'naming-style';

export const injectPassword = (
    url: string,
    password: Nullable<string> = null,
) => {
    if (typeof password === 'string' && password.length) {
        const oUrl = new URL(url);
        oUrl.password = password;

        url = oUrl.toString();
    }

    return url;
};

export const decomposeURL = (url: string) => {
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

    if (Number.isNaN(Number(parts.port))) {
        delete parts.port;
    }

    return parts;
};

/**
 * @deprecated
 * @param str
 * @returns {string}
 */
export const convertToCamel = (str: string) => {
    str = camel(str.toLowerCase());
    return `${str.substr(0, 1).toUpperCase()}${str.substr(1, str.length - 1)}`;
};
