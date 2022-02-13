import { ObjectEditorButtonsPropsType } from '../type';
import { AuthState } from '../../../../states';

export const useObjectEditorButtons = <E extends HTMLDivElement>({
    ...props
}: ObjectEditorButtonsPropsType) => {
    const { isAuthenticated, user } = AuthState.useContainer();

    return {
        rootProps: {
            ...props, // rest props go to the root node, as before
        },
        visible: isAuthenticated,
    };
};
