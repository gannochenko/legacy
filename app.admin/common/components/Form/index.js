import React, { useMemo, useRef } from 'react';
import { Formik } from 'formik';
import { Form, Fields } from './style.js';
import Button from '../../material-kit/CustomButtons';
import * as fieldSchema from '../../../shared/schema/field';

import FormFieldScalar from '../FormFieldScalar';
import FormFieldBoolean from '../FormFieldBoolean';
import FormFieldDate from '../FormFieldDate';
import FormFieldReference from '../FormFieldReference';
import { ENTITY_CODE_FIELD_NAME } from '../../../shared/constants';

const getField = field => {
    const type = field.getActualType();

    if (field.isReference()) {
        return FormFieldReference;
    }

    if (type === fieldSchema.TYPE_STRING || type === fieldSchema.TYPE_INTEGER) {
        return FormFieldScalar;
    }
    if (type === fieldSchema.TYPE_BOOLEAN) {
        return FormFieldBoolean;
    }
    if (type === fieldSchema.TYPE_DATETIME) {
        return FormFieldDate;
    }

    return null;
};

export default ({ data, schema, entity, onSubmit, dispatch, formData }) => {
    const initial = useMemo(() => _.cloneDeep(data), [data]);
    const validator = useMemo(() => entity.getValidator(), [entity]);
    const form = useRef();
    return (
        <Form>
            <Formik
                ref={form}
                initialValues={initial}
                onSubmit={onSubmit}
                validationSchema={validator}
            >
                {props => {
                    const {
                        values,
                        // touched,
                        errors,
                        // dirty,
                        isSubmitting,
                        handleChange,
                        // handleBlur,
                        handleSubmit,
                        // handleReset,
                    } = props;
                    return (
                        <>
                            <Fields>
                                {entity.getFields().map(field => {
                                    const fName = field.getName();
                                    if (fName === ENTITY_CODE_FIELD_NAME) {
                                        return;
                                    }

                                    const Field = getField(field);
                                    if (!Field) {
                                        return;
                                    }

                                    return (
                                        <Field
                                            key={fName}
                                            field={field}
                                            schema={schema}
                                            value={values[fName]}
                                            error={errors[fName]}
                                            onChange={handleChange}
                                            dispatch={dispatch}
                                            formData={formData[fName]}
                                        />
                                    );
                                })}
                            </Fields>
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                Save
                            </Button>
                        </>
                    );
                }}
            </Formik>
        </Form>
    );
};
