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

    if (isNaN(parts.port)) {
        delete parts.port;
    }

    return parts;
};
