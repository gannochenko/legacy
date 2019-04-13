import React, { useMemo, useRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Fields } from './style.js';
import Button from '../../material-kit/CustomButtons';
import * as fieldSchema from '../../../shared/schema/field';

import FormFieldString from '../FormFieldString';
import FormFieldBoolean from '../FormFieldBoolean';

const getField = field => {
    if (field.getType() === fieldSchema.TYPE_STRING) {
        return FormFieldString;
    }
    if (field.getType() === fieldSchema.TYPE_BOOLEAN) {
        return FormFieldBoolean;
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
