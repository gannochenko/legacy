import React, { useRef } from 'react';
import FormField from '../FormField';
import DropPanel from '../../to-npm/DropPanel';
import { withTheme } from '../../style/global';

import { List, ItemPicker, AddButton } from './style.js';

export default withTheme(({ field, value, error, onChange, theme }) => {
    const dpRef = useRef();

    return (
        <FormField
            field={field}
            error={error}
            actions={field.isMultiple() ? <AddButton /> : null}
        >
            <DropPanel
                panel={<ItemPicker />}
                theme={theme.dropPanel}
                ref={dpRef}
            >
                <List>111</List>
            </DropPanel>
        </FormField>
    );
});
