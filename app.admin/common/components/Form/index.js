import React, { useMemo, useRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Fields } from './style.js';
import Button from '../../material-kit/CustomButtons';
import * as fieldSchema from '../../../shared/schema/field';

import FormFieldScalar from '../FormFieldScalar';
import FormFieldBoolean from '../FormFieldBoolean';
import FormFieldDate from '../FormFieldDate';
import FormFieldReference from '../FormFieldReference';

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

export default ({ data, schema, entity }) => {
    const initial = useMemo(() => _.cloneDeep(data), [data]);
    const form = useRef();
    return (
        <Form>
            <Formik
                ref={form}
                initialValues={initial}
                onSubmit={(values, { setSubmitting }) => {
                    console.dir(values);
                    // setTimeout(() => {
                    //    console.dir(values);
                    // 	setSubmitting(false);
                    // }, 500);
                }}
                // validationSchema={Yup.object().shape({
                // 	email: Yup.string()
                // 		.email()
                // 		.required('Required'),
                // })}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                    } = props;
                    return (
                        <>
                            <Fields>
                                {entity.getFields().map(field => {
                                    const fName = field.getName();
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
                                        />
                                    );
                                })}
                            </Fields>
                            <Button
                                type="submit"
                                onClick={() => {
                                    form.current.submitForm();
                                }}
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
