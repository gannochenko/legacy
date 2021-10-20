import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
// import latinize from 'latinize';

import { awsOptions } from '../../utils/awsOptions';
import { GetSignedUploadURLOutputType } from './type';
// import { ObjectEntity } from '../../entities/ObjectEntity';

const s3 = new S3({
    ...awsOptions,
    s3ForcePathStyle: true,
    apiVersion: 'latest',
});

const BUCKET_NAME = process.env.AWS_OBJECT_PHOTOS_BUCKET_NAME;
const URL_EXPIRATION_SECONDS = 300;

@Injectable()
export class ObjectUploadsService {
    async getSignedUploadURL(): Promise<GetSignedUploadURLOutputType> {
        const randomID = Math.random() * 10000000;
        const Key = `${randomID}.jpg`;

        // Get signed URL from S3
        const s3Params = {
            Bucket: BUCKET_NAME,
            Key,
            Expires: URL_EXPIRATION_SECONDS,
            ContentType: 'image/jpeg',
        };
        const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);
        // return JSON.stringify({
        //     uploadURL: uploadURL,
        //     Key,
        // });

        return { data: uploadURL, aux: {} };
    }
}
