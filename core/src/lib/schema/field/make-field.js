import _ from '../../lodash';
import {
    FIELD_TYPE_BOOLEAN,
    FIELD_TYPE_DATETIME,
    FIELD_TYPE_INTEGER,
    FIELD_TYPE_STRING,
} from './type';
import { StringField } from './string';
import { BooleanField } from './boolean';
import { IntegerField } from './integer';
import { DateTimeField } from './datetime';
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

    if (type === FIELD_TYPE_STRING) {
        return new StringField(declaration);
    } else if (type === FIELD_TYPE_BOOLEAN) {
        return new BooleanField(declaration);
    } else if (type === FIELD_TYPE_INTEGER) {
        return new IntegerField(declaration);
    } else if (type === FIELD_TYPE_DATETIME) {
        return new DateTimeField(declaration);
    }

    return new ReferenceField(declaration);
};
