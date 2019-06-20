import React, { useMemo } from 'react';
import { FieldSet, AddButton } from './style';

export const Add = ({ field, value, onChange, initialValue }) => {
    if (!field.isMultiple() || !_.isFunction(onChange)) {
        return null;
    }

    if (!_.isArray(value)) {
        value = [];
    }

    return (
        <AddButton
            onClick={() => {
                onChange({
                    target: {
                        name: field.getName(),
                        value: [
                            ...value,
                            initialValue !== undefined ? initialValue : '',
                        ],
                    },
                });
            }}
        />
    );
};

const FormFieldMultiplier = ({ field, value, onChange, children }) => {
    if (field.isMultiple() && !_.isArray(value)) {
        value = [];
    }

    const fieldName = field.getName();
    const lines = useMemo(() => {
        if (!field.isMultiple()) {
            return null;
        }

        return value.map((subValue, key) => ({
            key: `${fieldName}_${key}`,
            value: subValue,
        }));
    }, [value]);

    const multiChange = (key, e) => {
        const ix = lines.findIndex(line => line.key === key);
        if (ix >= 0) {
            lines[ix].value = e.target.value;
            onChange({
                target: {
                    name: fieldName,
                    value: lines.map(line => line.value),
                },
            });
        }
    };

    return (
        <>
            {field.isMultiple() && (
                <FieldSet>
                    {lines.map(line =>
                        children({
                            field,
                            value: line.value,
                            key: line.key,
                            onChange: e => multiChange(line.key, e),
                        }),
                    )}
                </FieldSet>
            )}
            {!field.isMultiple() &&
                children({ field, value, onChange, name: fieldName })}
        </>
    );
};

export default FormFieldMultiplier;
