import React, { forwardRef } from 'react';

import { <%- component_name_pascal %>PropsType } from './type';
import { <%- component_name_pascal %>Root } from './style';
import { use<%- component_name_pascal %> } from './hooks/use<%- component_name_pascal %>';

export const <%- component_name_pascal %> = forwardRef<HTMLDivElement, <%- component_name_pascal %>PropsType>(
    function <%- component_name_pascal %>(props, ref) {
        const {
            rootProps,
        } = use<%- component_name_pascal %>(ref, props);

        return (
            <<%- component_name_pascal %>Root {...rootProps}>
                Hello
            </<%- component_name_pascal %>Root>
        );
    }
);

<%- component_name_pascal %>.defaultProps = {
};
