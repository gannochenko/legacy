import React, { useMemo } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Fields } from './style.js';

import FormFieldString from '../FormFieldString';

export default ({ data, schema, entity }) => {
    const initial = useMemo(() => _.cloneDeep(data), [data]);
    return (
        <Form>
            <Formik
                initialValues={initial}
                // onSubmit={(values, { setSubmitting }) => {
                // 	setTimeout(() => {
                // 		alert(JSON.stringify(values, null, 2));
                // 		setSubmitting(false);
                // 	}, 500);
                // }}
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

                    //console.dir(values);

                    return (
                        <Fields>
                            {entity.getFields().map(field => {
                                const fName = field.getName();
                                return (
                                    <FormFieldString
                                        key={fName}
                                        field={field}
                                        value={values[fName]}
                                        error={errors[fName]}
                                        onChange={handleChange}
                                    />
                                );
                            })}
                        </Fields>
                    );
                }}
            </Formik>
        </Form>
    );
};
