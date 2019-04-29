import React from 'react';

export const Context = React.createContext();
export const withNotification = Component => {
    return props => (
        <Context.Consumer>
            {reference => (
                <Component
                    {...props}
                    notify={(...args) => reference.current.notify(...args)}
                />
            )}
        </Context.Consumer>
    );
};
