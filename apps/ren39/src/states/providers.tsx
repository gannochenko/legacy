import React, { FC } from 'react';
import { ContactFormState } from './contactFormState';

export const StateProviders: FC = ({ children }) => {
    return <ContactFormState.Provider>{children}</ContactFormState.Provider>;
};
