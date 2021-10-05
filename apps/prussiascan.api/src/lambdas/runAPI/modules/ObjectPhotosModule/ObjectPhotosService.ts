import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 } from 'uuid';
import sharp from 'sharp';
import { S3 } from 'aws-sdk';
import { awsOptions } from '../../utils/awsOptions';
import { ObjectsService } from '../ObjectsModule/ObjectsService';
import { StoreObjectPhotoInputType, StoreObjectPhotoOutputType } from './type';

const s3 = new S3(awsOptions);

const BUCKET_URL = process.env.AWS_OBJECT_PHOTOS_BUCKET_URL;
const IMAGE_SIZE_CONSTRAINT = 1500;

@Injectable()
export class ObjectPhotosService {
    constructor(private readonly objectsService: ObjectsService) {}

    async store(
        data: StoreObjectPhotoInputType,
        file: Express.Multer.File,
    ): Promise<StoreObjectPhotoOutputType> {
        const { objectId, period, year } = data;

        if (!BUCKET_URL) {
            throw new InternalServerErrorException();
        }

        const fileContent = await this.prepareImage(file);
        const fileId = v4();

        const safeObjectId = objectId.replace(/([^a-f0-9-])+/g, '');
        const fileKey = `${safeObjectId}/${fileId}.jpg`;

        const params = {
            Bucket: BUCKET_URL,
            Key: fileKey,
            ACL: 'public-read',
            Body: fileContent,
        };

        try {
            await s3.upload(params);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        const result = await this.objectsService.addPhoto(objectId, {
            period,
            year,
            path: fileKey,
        });

        return { data: {}, aux: {} };
    }

    private async prepareImage(file: Express.Multer.File) {
        const { buffer } = file;

        let sharpFile = sharp(buffer);
        const { width, height } = await sharpFile.metadata();

        if (width === undefined || height === undefined) {
            throw new InternalServerErrorException(
                'Cannot extract file metadata',
            );
        }

        if (width > IMAGE_SIZE_CONSTRAINT || height > IMAGE_SIZE_CONSTRAINT) {
            sharpFile = await sharpFile.resize(
                IMAGE_SIZE_CONSTRAINT,
                IMAGE_SIZE_CONSTRAINT,
            );
        }

        return sharpFile.jpeg({ quality: 90 }).toBuffer();
    }
}
