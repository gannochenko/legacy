import { camel } from 'naming-style';
import { stringify, parse } from '@m59/qs';

export const convertToCamel = str => {
    str = camel(str.toLowerCase());
    return `${str.substr(0, 1).toUpperCase()}${str.substr(1, str.length - 1)}`;
};

export const putSearchParameters = (url, params) => {
	return `?${stringify(
		Object.assign({}, parse(url.replace(/^\?/, '')), params),
	)}`;
};

export const parseSearch = url => parse(url.replace(/^\?/, ''));
