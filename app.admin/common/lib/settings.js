import React from 'react';

export const SettingsContext = React.createContext();
export const withSettings = Component => {
    return props => (
        <SettingsContext.Consumer>
            {value => <Component {...props} settings={value} />}
        </SettingsContext.Consumer>
    );
};
