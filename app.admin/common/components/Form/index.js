import React, { useMemo, useRef } from 'react';
import { Formik } from 'formik';
import { withModal } from 'ew-internals-ui';
import {
    FormContainer,
    Fields,
    ButtonWrap,
    DeleteButton,
    FormButtons,
} from './style';
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

const Form = ({
    data,
    schema,
    entity,
    onSubmit,
    onActionClick,
    dispatch,
    formData,
    openConfirmModal,
}) => {
    const initial = useMemo(() => _.cloneDeep(data), [data]);
    const validator = useMemo(() => entity.getValidator(), [entity]);
    const form = useRef();
    return (
        <FormContainer>
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
                            <FormButtons>
                                <ButtonWrap>
                                    <Button
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                    >
                                        Save
                                    </Button>
                                </ButtonWrap>
                                {_.isne(data.code) && (
                                    <DeleteButton
                                        href="javascript:void(0)"
                                        onClick={event => {
                                            openConfirmModal(
                                                <span>
                                                    Do you really want to delete
                                                    item {data.code}?<br />
                                                    You won't be able to un-do
                                                    this.
                                                </span>,
                                                ({ closeModal }) => {
                                                    return [
                                                        <ButtonWrap key="yes">
                                                            <Button
                                                                onClick={() => {
                                                                    onActionClick(
                                                                        'delete',
                                                                    );
                                                                    closeModal();
                                                                }}
                                                            >
                                                                Yes
                                                            </Button>
                                                        </ButtonWrap>,
                                                        <ButtonWrap key="no">
                                                            <Button
                                                                onClick={
                                                                    closeModal
                                                                }
                                                            >
                                                                No
                                                            </Button>
                                                        </ButtonWrap>,
                                                    ];
                                                },
                                            );
                                            event.preventDefault();
                                        }}
                                    >
                                        Delete
                                    </DeleteButton>
                                )}
                            </FormButtons>
                        </>
                    );
                }}
            </Formik>
        </FormContainer>
    );
};

export default withModal(Form);
