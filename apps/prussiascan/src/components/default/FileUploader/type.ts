import { HTMLAttributes } from 'react';
import { StylePropsType, MarginPropsType } from '@gannochenko/ui.emotion';

export type FileUploaderPropsType = HTMLAttributes<HTMLDivElement> &
    Partial<{
        open: boolean;
        onOpenChange: (newState: boolean) => void;
        // put your custom props here
    }> &
    MarginPropsType;

export type FileUploaderRootPropsType = StylePropsType & FileUploaderPropsType;

export type SelectedFileType = {
    file: File;
    preview: string;
};
