import React, { useState } from 'react';
import FormField from '../FormField';
import FormFieldMultiplier, { Add } from '../FormFieldMultiplier';
import { Checkbox, Check, InvisibleCheck } from './style.js';

const Toggle = ({ field, value, onChange }) => {
    const [checked, setChecked] = useState(!!value);
    return (
        <Checkbox>
            <Check checked={checked} />
            <InvisibleCheck
                type="checkbox"
                defaultChecked={!!value}
                onChange={e => {
                    setChecked(e.target.checked);
                    onChange({
                        target: {
                            value: e.target.checked,
                            name: field.getName(),
                        },
                    });
                }}
            />
        </Checkbox>
    );
};

export default ({ field, value, error, onChange }) => (
    <FormField
        field={field}
        error={error}
        actions={
            field.isMultiple() ? (
                <Add field={field} onChange={onChange} value={value} />
            ) : null
        }
    >
        <FormFieldMultiplier field={field} value={value} onChange={onChange}>
            {props => <Toggle {...props} />}
        </FormFieldMultiplier>
    </FormField>
);
