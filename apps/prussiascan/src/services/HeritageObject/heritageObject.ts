import { FileUploadQuota } from './type';
import { fetchJSON } from '../../util/fetchJSON';
import { UploadElementType } from '../../components/default/FileUploader/type';

const API_URL = process.env.API_URL;
const API_ENV = process.env.API_ENV;

export const getUploadUrls = async (
    objectId: string,
    fileQuota: FileUploadQuota,
) => {
    return fetchJSON(`${API_URL}${API_ENV}/data/objects/getuploadurl`, {
        objectId,
        fileQuota,
    });
};

export const uploadFiles = async (uploads: UploadElementType[]) => {
    console.log('CALLLL!');
    console.log(uploads);

    // return fetchJSON(`${API_URL}${API_ENV}/data/objects/getuploadurl`, {
    //     objectId,
    //     fileQuota,
    // });

    return [];
};
