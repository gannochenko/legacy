import React, { useRef } from 'react';
import FormField from '../FormField';
import FormFieldMultiplier, { Add } from '../FormFieldMultiplier';
import { Input, DatePickerPanel } from './style.js';
import DatePicker from '../DatePicker';
import DropPanel from '../../to-npm/DropPanel';
import { withTheme } from '../../style/global';

export default withTheme(({ field, value, error, onChange, theme }) => {
    const dpRef = useRef();

    return (
        <FormField
            field={field}
            error={error}
            actions={
                field.isMultiple() ? (
                    <Add field={field} onChange={onChange} value={value} />
                ) : null
            }
        >
            <FormFieldMultiplier
                field={field}
                value={value}
                onChange={onChange}
            >
                {props => (
                    <DropPanel
                        panel={
                            <DatePickerPanel>
                                <DatePicker />
                            </DatePickerPanel>
                        }
                        theme={theme.dropPanel}
                        ref={dpRef}
                    >
                        <Input
                            {...props}
                            onFocus={() => dpRef.current.open()}
                            onClick={() => dpRef.current.open()}
                            autoComplete="off"
                        />
                    </DropPanel>
                )}
            </FormFieldMultiplier>
        </FormField>
    );
});
