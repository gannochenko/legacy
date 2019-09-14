import React from 'react';
import { FIELD_TYPE_INTEGER } from '@project-minimum/core';

import { FormField, FormFieldMultiplier, Add } from '..';
import { Input } from './style';

export const FormFieldScalar = ({ field, value, error, onChange }) => (
    <FormField
        field={field}
        error={error}
        actions={
            field.isMultiple() ? (
                <Add
                    field={field}
                    onChange={onChange}
                    value={value}
                    initialValue={
                        field.getActualType() === FIELD_TYPE_INTEGER ? '0' : ''
                    }
                />
            ) : null
        }
    >
        <FormFieldMultiplier field={field} value={value} onChange={onChange}>
            {props => <Input {...props} />}
        </FormFieldMultiplier>
    </FormField>
);
