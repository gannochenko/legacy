import React from 'react';
import { Settings } from 'ew-internals';

export const createSettings = () => new Settings();
export const Context = React.createContext();
export const withSettings = Component => {
    const ComponentWithSettings = props => (
        <Context.Consumer>
            {value => <Component {...props} settings={value} />}
        </Context.Consumer>
    );

    return ComponentWithSettings;
};
