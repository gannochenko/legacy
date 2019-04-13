import React, { useState, useMemo } from 'react';
import { FormField, Footer, Label, Error, Actions } from './style.js';

export default ({ field, value, onChange, actions, error, children }) => {
    return (
        <FormField>
            <Label>{field.getDisplayName()}</Label>
            {children}
            <Footer>
                <Error>{error || null}</Error>
                {!!actions && <Actions>{actions}</Actions>}
            </Footer>
        </FormField>
    );
};
