import React from 'react';
import FormField from '../FormField';
import FormFieldMultiplier, { Add } from '../FormFieldMultiplier';
import { Input, Wrapper, PickerPanel } from './style.js';
import DatePicker from '../DatePicker';

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
            {props => (
                <Wrapper>
                    <Input {...props} />
                    <PickerPanel>
                        <DatePicker />
                    </PickerPanel>
                </Wrapper>
            )}
        </FormFieldMultiplier>
    </FormField>
);
