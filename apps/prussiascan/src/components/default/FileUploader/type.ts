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
    mime: MimeType | null;
    preview: string;
    id: string;
};

export type UploadElementType = SelectedFileType & {
    id: string;
    objectId: string;
    url: string;
    fileId: string;
};

export enum ProcessStages {
    INITIAL,
    GET_UPLOAD_URL,
    UPLOAD_IMAGES,
    ATTACHING_IMAGES,
}

export type ProcessType = {
    serial: number;
    stage: ProcessStages;
    fileProgress: Record<string, number>;
};

export enum MimeType {
    jpg = 'jpg',
    png = 'png',
}

export type UploadURLListType = {
    attributes: {
        fileId: string;
        fileMime: MimeType;
        objectId: string;
        url: string;
    };
};
