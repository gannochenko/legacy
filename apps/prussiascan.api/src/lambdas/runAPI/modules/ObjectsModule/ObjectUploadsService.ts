import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 } from 'uuid';

import { awsOptions } from '../../utils/awsOptions';
import {
    GetSignedUploadURLInputType,
    GetSignedUploadURLOutputType,
    MimeType,
} from './type';

const s3 = new S3({
    ...awsOptions,
    s3ForcePathStyle: true,
    apiVersion: 'latest',
});

const BUCKET_NAME = process.env.AWS_OBJECT_PHOTOS_BUCKET_NAME;
const URL_EXPIRATION_SECONDS = 300;

@Injectable()
export class ObjectUploadsService {
    async getSignedUploadURL({
        objectId,
        type,
    }: GetSignedUploadURLInputType): Promise<GetSignedUploadURLOutputType> {
        const fileId = v4();

        const safeObjectId = objectId.replace(/([^a-f0-9-])+/g, '');
        const key = `${safeObjectId}/${fileId}.${
            type === MimeType.png ? 'png' : 'jpg'
        }`;

        // Get signed URL from S3
        const s3Params = {
            Bucket: BUCKET_NAME,
            Key: key,
            Expires: URL_EXPIRATION_SECONDS,
            ContentType: MimeType.png ? 'image/png' : 'image/jpeg',
        };
        const url = await s3.getSignedUrlPromise('putObject', s3Params);

        return { data: { url, key }, aux: {} };
    }
}
