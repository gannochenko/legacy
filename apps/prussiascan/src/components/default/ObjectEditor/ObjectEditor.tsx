import React, { FC } from 'react';

import { ObjectEditorPropsType } from './type';
import { ObjectEditorRoot } from './style';
import { useObjectEditor } from './hooks/useObjectEditor';

export const ObjectEditor: FC<ObjectEditorPropsType> = (props) => {
    const { rootProps } = useObjectEditor(props);

    return <ObjectEditorRoot {...rootProps}>Hello</ObjectEditorRoot>;
};
