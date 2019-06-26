import React, { useRef } from 'react';
import moment from 'moment';
import { DropPanel } from 'ew-internals-ui';
import { Input, DatePickerPanel } from './style';
import { FormField, DatePicker, FormFieldMultiplier, Add } from '..';
import { withTheme } from '../../style/global';

const FormFieldDateComponent = ({ field, value, error, onChange, theme }) => {
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
                        panel={() => (
                            <DatePickerPanel>
                                <DatePicker
                                    value={value}
                                    onChange={date => {
                                        onChange({
                                            target: {
                                                name: props.name,
                                                value: date.toISOString(),
                                            },
                                        });
                                    }}
                                    onDaySelect={() =>
                                        dpRef.current.closeImmediate()
                                    }
                                />
                            </DatePickerPanel>
                        )}
                        theme={theme.dropPanel}
                        ref={dpRef}
                        openOnChildrenClick={false}
                    >
                        {() => (
                            <Input
                                {...props}
                                value={
                                    value
                                        ? moment(value).format('DD.MM.YYYY')
                                        : ''
                                }
                                onFocus={() => dpRef.current.open()}
                                onBlur={() => dpRef.current.close()}
                                onClick={() => dpRef.current.open()}
                                autoComplete="off"
                                readOnly
                            />
                        )}
                    </DropPanel>
                )}
            </FormFieldMultiplier>
        </FormField>
    );
};

export const FormFieldDate = withTheme(FormFieldDateComponent);
