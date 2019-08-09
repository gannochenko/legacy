import React from 'react';
import {
    FormFieldContainer,
    Footer,
    Label,
    Error,
    Actions,
    RedStar,
} from './style';

export const FormField = ({ field, actions, error, children }) => {
    return (
        <FormFieldContainer>
            <Label>
                {field.getDisplayName()}{' '}
                {field.isRequired() && <RedStar>*</RedStar>}
            </Label>
            {children}
            <Footer>
                <Error>{error || null}</Error>
                {!!actions && <Actions>{actions}</Actions>}
            </Footer>
        </FormFieldContainer>
    );
};
