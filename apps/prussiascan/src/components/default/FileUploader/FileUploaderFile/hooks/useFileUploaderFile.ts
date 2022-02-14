import { FileUploaderFilePropsType } from '../type';

export const useFileUploaderFile = <E extends HTMLDivElement>({
    ...props
}: FileUploaderFilePropsType) => {
    return {
        rootProps: {
            ...props, // rest props go to the root node, as before
        },
    };
};
