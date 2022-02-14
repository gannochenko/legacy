import { FileUploaderPropsType } from '../type';
import { Breakpoint } from '@mui/system';

export const useFileUploader = <E extends HTMLDivElement>({
    open,
    ...props
}: FileUploaderPropsType) => {
    return {
        rootProps: {
            ...props, // rest props go to the root node, as before
        },
        dialogProps: {
            open: !!open,
            onClose: () => {},
            maxWidth: 'lg' as Breakpoint,
        },
    };
};
