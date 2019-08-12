import _ from '../../lodash';
import {
    FIELD_TYPE_BOOLEAN,
    FIELD_TYPE_DATETIME,
    FIELD_TYPE_INTEGER,
    FIELD_TYPE_STRING,
} from './type';
import { ENTITY_ID_FIELD_NAME } from '../../constants.both';
import { StringField } from './string';
import { BooleanField } from './boolean';
import { IntegerField } from './integer';
import { DateTimeField } from './datetime';
import { ReferenceField } from './reference';
import { IdStringField } from './id-string';

export const makeField = declaration => {
    let { type } = declaration;
    const { name } = declaration;
    if (!type) {
        return new StringField(declaration);
    }

    if (_.isArray(type)) {
        [type] = type;
    }
    if (!type) {
        return new this(declaration);
    }

    if (name === ENTITY_ID_FIELD_NAME) {
        return new IdStringField(declaration);
    }

    if (type === FIELD_TYPE_STRING) {
        return new StringField(declaration);
    }

    if (type === FIELD_TYPE_BOOLEAN) {
        return new BooleanField(declaration);
    }

    if (type === FIELD_TYPE_INTEGER) {
        return new IntegerField(declaration);
    }

    if (type === FIELD_TYPE_DATETIME) {
        return new DateTimeField(declaration);
    }

    return new ReferenceField(declaration);
};
