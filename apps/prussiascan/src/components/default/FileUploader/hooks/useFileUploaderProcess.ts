import {
    FileUploaderPropsType,
    ProcessStages,
    ProcessType,
    SelectedFileType,
} from '../type';
import { useCallback, useEffect, useMemo, useState } from 'react';
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

const initialProcess: ProcessType = {
    serial: 0,
    stage: ProcessStages.INITIAL,
    fileProgress: {},
};

export const useFileUploaderProcess = (
    { objectId }: FileUploaderPropsType,
    { files }: { files: SelectedFileType[] },
) => {
    const [process, setProcess] = useState<ProcessType>(initialProcess);

    useEffect(() => {
        setProcess(initialProcess);
    }, [files]);

    const fileQuota = useMemo(() => makeFileQuota(files), [files]);
    const {
        data: uploadUrlsData,
        isSuccess: isUploadUrlsSuccess,
        isLoading: isUploadUrlsLoading,
    } = useQuery(
        `proc-upload-urls-${process.serial}`,
        () => getUploadUrls(objectId, fileQuota),
        {
            cacheTime: 0,
            enabled: process.stage === ProcessStages.GET_UPLOAD_URL,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
        },
    );

    const uploadList = useMemo(
        () => makeUploadList(files, uploadUrlsData?.data),
        [files, uploadUrlsData],
    );
    const onFileProgressChange = useCallback(
        (fileId: string, progress: number) => {
            // setProcess(prevState => {
            //     return [];
            // });
            console.log(fileId, progress);
        },
        [],
    );
    const {
        data: uploadsData,
        isSuccess: isUploadsSuccess,
        isLoading: isUploadsLoading,
    } = useQuery(
        `proc-upload-${process.serial}`,
        () => uploadFiles(uploadList, onFileProgressChange),
        {
            cacheTime: 0,
            enabled: process.stage === ProcessStages.UPLOAD_IMAGES,
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
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
        fileProgress: process.fileProgress,
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
