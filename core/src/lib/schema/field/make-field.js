import _ from '../../lodash';
import {
    TYPE_BOOLEAN,
    TYPE_DATETIME,
    TYPE_INTEGER,
    TYPE_STRING,
} from '../../field-types';
import { StringField } from './string';
import { BooleanField } from './boolean';
import { IntegerField } from './integer';
import { DateField } from './date';
import { ReferenceField } from './reference';

export const makeField = declaration => {
    let { type } = declaration;
    if (!type) {
        return new this(declaration);
    }

    if (_.isArray(type)) {
        [type] = type;
    }
    if (!type) {
        return new this(declaration);
    }

    if (type === TYPE_STRING) {
        return new StringField(declaration);
    } else if (type === TYPE_BOOLEAN) {
        return new BooleanField(declaration);
    } else if (type === TYPE_INTEGER) {
        return new IntegerField(declaration);
    } else if (type === TYPE_DATETIME) {
        return new DateField(declaration);
    }

    return new ReferenceField(declaration);
};
