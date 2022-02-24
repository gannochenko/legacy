import axios from 'axios';

import { FileUploadQuota } from './type';
import { fetchJSON } from '../../util/fetchJSON';
import { UploadElementType } from '../../components/default/FileUploader/type';

const API_URL = process.env.API_URL;
const API_ENV = process.env.API_ENV;

export const getUploadUrls = async (
    objectId: string,
    fileQuota: FileUploadQuota,
) => {
    console.log('GET UPLOAD URLS');
    return fetchJSON(`${API_URL}${API_ENV}/data/objects/getuploadurl`, {
        objectId,
        fileQuota,
    });
};

export const uploadFiles = async (
    uploads: UploadElementType[],
    onFileProgressChange: (upload: UploadElementType, progress: number) => void,
) => {
    console.log('CALLLL!');

    const upload = uploads[0];
    console.log(upload);

    await axios.request({
        method: 'put',
        url: upload.url,
        data: upload.file,
        onUploadProgress: (p) => {
            onFileProgressChange(
                upload,
                Math.round((p.loaded / p.total) * 100),
            );
        },
    });

    // return fetchJSON(`${API_URL}${API_ENV}/data/objects/getuploadurl`, {
    //     objectId,
    //     fileQuota,
    // });

    return [];
};
