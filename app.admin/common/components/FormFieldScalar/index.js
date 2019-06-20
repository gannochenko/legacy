import React from 'react';
import { TYPE_INTEGER } from 'project-minimum-core';

import FormField from '../FormField';
import FormFieldMultiplier, { Add } from '../FormFieldMultiplier';
import { Input } from './style';

const FormFieldScalar = ({ field, value, error, onChange }) => (
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
                        field.getActualType() === TYPE_INTEGER ? '0' : ''
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

export default FormFieldScalar;
