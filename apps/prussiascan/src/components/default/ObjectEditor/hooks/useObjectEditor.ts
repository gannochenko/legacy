import { ObjectEditorPropsType } from '../type';

export const useObjectEditor = <E extends HTMLDivElement>({
    ...props
}: ObjectEditorPropsType) => {
    return {
        rootProps: {
            ...props, // rest props go to the root node, as before
        },
    };
};
