import { HTMLAttributes } from 'react';
import { StylePropsType, MarginPropsType } from '@gannochenko/ui.emotion';

export type FileUploaderPropsType = HTMLAttributes<HTMLDivElement> &
    Partial<{
        open: boolean;
        onOpenChange: (newState: boolean) => void;
        // put your custom props here
    }> & {
        objectId: string;
    } & MarginPropsType;

export type FileUploaderRootPropsType = StylePropsType & FileUploaderPropsType;

export type SelectedFileType = {
    file: File;
    preview: string;
    id: string;
};

export enum ProcessStages {
    INITIAL,
    GET_UPLOAD_URL,
}

export type ProcessType = {
    serial: number;
    stage: ProcessStages;
};

export enum MimeType {
    jpg = 'jpg',
    png = 'png',
}
