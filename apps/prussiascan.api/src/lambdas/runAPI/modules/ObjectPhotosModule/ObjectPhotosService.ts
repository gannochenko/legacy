import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { S3 } from 'aws-sdk';
import { awsOptions } from '../../utils/awsOptions';
import { ObjectsService } from '../ObjectsModule/ObjectsService';
import { StoreObjectPhotoInputType, StoreObjectPhotoOutputType } from './type';

const s3 = new S3({
    ...awsOptions,
    s3ForcePathStyle: true,
    apiVersion: 'latest',
});

const BUCKET_NAME = process.env.AWS_OBJECT_PHOTOS_BUCKET_NAME;
const IMAGE_SIZE_CONSTRAINT = 1500;

@Injectable()
export class ObjectPhotosService {
    constructor(private readonly objectsService: ObjectsService) {}

    async store(
        data: StoreObjectPhotoInputType,
        file: Buffer,
    ): Promise<StoreObjectPhotoOutputType> {
        const {
            objectId,
            author,
            source,
            capturedAt,
            capturedYearStart,
            capturedYearEnd,
        } = data;

        if (!BUCKET_NAME) {
            throw new InternalServerErrorException('No bucket name specified');
        }

        // todo: check if element exists
        if (!objectId || !(await this.objectsService.isExists(objectId))) {
            throw new NotFoundException('Object not found');
        }

        const fileContent = await this.prepareImage(file);
        const fileId = v4();

        console.log('Image converted');

        const safeObjectId = objectId.replace(/([^a-f0-9-])+/g, '');
        const entryKey = `${safeObjectId}/${fileId}.jpg`;

        const params = {
            Bucket: BUCKET_NAME,
            Key: entryKey,
            ACL: 'public-read',
            Body: fileContent,
        };

        try {
            await s3.upload(params).promise();
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Could not upload');
        }

        console.log('Saving');

        await this.objectsService.addPhoto(objectId, {
            author,
            source,
            capturedAt,
            capturedYearStart,
            capturedYearEnd,
            path: entryKey,
        });

        return { data: {}, aux: {} };
    }

    private async prepareImage(file: Buffer) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const sharp = require(true ? 'sharp' : '/opt/node_modules/sharp');
        // const sharp = require(__DEV__ ? 'sharp' : '/opt/node_modules/sharp');

        let sharpFile = sharp(file);
        const { width, height } = await sharpFile.metadata();

        console.log(width);
        console.log(height);

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
