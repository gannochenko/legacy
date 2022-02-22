import {
    FileUploaderPropsType,
    ProcessStages,
    ProcessType,
    SelectedFileType,
} from '../type';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {
    getUploadUrls,
    uploadFiles,
} from '../../../../services/HeritageObject/heritageObject';
import { makeFileQuota, makeUploadList } from '../util/uploadHelpers';

const getProgress = (process: ProcessType) => {
    if (
        process.stage === ProcessStages.INITIAL ||
        process.stage === ProcessStages.GET_UPLOAD_URL
    ) {
        return 0;
    }
    if (process.stage === ProcessStages.UPLOAD_IMAGES) {
        return 20;
    }

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

    const {
        data: uploadUrlsData,
        isSuccess: isUploadUrlsSuccess,
        isLoading: isUploadUrlsLoading,
    } = useQuery(
        `proc-${process.serial}`,
        () => getUploadUrls(objectId, makeFileQuota(files)),
        {
            enabled: process.stage === ProcessStages.GET_UPLOAD_URL,
        },
    );

    const {
        data: uploadsData,
        isSuccess: isUploadsSuccess,
        isLoading: isUploadsLoading,
    } = useQuery(
        `proc-${process.serial}`,
        () => uploadFiles(makeUploadList(files, uploadUrlsData?.data)),
        {
            enabled: process.stage === ProcessStages.UPLOAD_IMAGES,
        },
    );

    useEffect(() => {
        if (isUploadUrlsSuccess && !isUploadUrlsLoading) {
            setProcess((prevState) => ({
                ...prevState,
                stage: ProcessStages.UPLOAD_IMAGES,
            }));
        }
    }, [isUploadUrlsLoading, isUploadUrlsSuccess]);

    return {
        setProcess,
        progress: getProgress(process),
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
