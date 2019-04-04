import { camel } from 'naming-style';

export const convertToCamel = str => {
    str = camel(str.toLowerCase());
    return `${str.substr(0, 1).toUpperCase()}${str.substr(1, str.length - 1)}`;
};
