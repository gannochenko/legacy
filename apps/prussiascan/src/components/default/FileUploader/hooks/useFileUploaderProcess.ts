import {
    FileUploaderPropsType,
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
        () => getUploadUrls(objectId, {}),
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
    };
};
