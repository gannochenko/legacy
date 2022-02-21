import {
    FileUploaderPropsType,
    MimeType,
    ProcessStages,
    ProcessType,
    SelectedFileType,
} from '../type';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getUploadUrls } from '../../../../services/HeritageObject/heritageObject';

const getProgress = () => {
    return 0;
};

const makeFileQuota = (files: SelectedFileType[]) => {
    const result: Record<string, number> = {};

    files.forEach(({ file }) => {
        const fileName = file.name.toUpperCase();
        let mime = '';
        if (fileName.endsWith('.JPG') || fileName.endsWith('.JPEG')) {
            mime = MimeType.jpg;
        }
        if (fileName.endsWith('.PNG')) {
            mime = MimeType.png;
        }

        if (mime) {
            result[mime] = result[mime] ? result[mime] + 1 : 1;
        }
    });

    return result;
};

export const useFileUploaderProcess = (
    { objectId }: FileUploaderPropsType,
    { files }: { files: SelectedFileType[] },
) => {
    const [process, setProcess] = useState<ProcessType>({
        serial: 0,
        stage: ProcessStages.INITIAL,
    });

    const { data: uploadUrlsData, isSuccess: isUploadUrlsSuccess } = useQuery(
        `proc-${process.serial}`,
        () => getUploadUrls(objectId, makeFileQuota(files)),
        {
            enabled: process.stage === ProcessStages.GET_UPLOAD_URL,
        },
    );

    return {
        setProcess,
        progress: getProgress(),
        uploadUrls: uploadUrlsData,
        next: () =>
            setProcess((prevState) => ({
                ...prevState,
                serial: prevState.serial + 1,
                stage: ProcessStages.GET_UPLOAD_URL,
            })),
        loading: process.stage !== ProcessStages.INITIAL,
    };
};
