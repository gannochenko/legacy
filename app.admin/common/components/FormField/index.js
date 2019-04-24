import React, { useState, useMemo } from 'react';
import { FormField, Footer, Label, Error, Actions, RedStar } from './style.js';

export default ({ field, value, onChange, actions, error, children }) => {
    return (
        <FormField>
            <Label>
                {field.getDisplayName()}{' '}
                {field.isMandatory() && <RedStar>*</RedStar>}
            </Label>
            {children}
            <Footer>
                <Error>{error || null}</Error>
                {!!actions && <Actions>{actions}</Actions>}
            </Footer>
        </FormField>
    );
};
