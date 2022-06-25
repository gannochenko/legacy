import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 } from 'uuid';

import { awsOptions } from '../../utils/awsOptions';
import {
    GetSignedUploadURLInputType,
    AttachFileInputType,
    MimeType,
} from './type';
import { ObjectsService } from './ObjectsService';
import { ObjectPhotoEntity } from '../../entities';
import { tryExecute } from '../../utils/tryExecute';

const s3 = new S3({
    ...awsOptions,
    s3ForcePathStyle: true,
    apiVersion: 'latest',
});

const BUCKET_NAME = process.env.AWS_OBJECT_PHOTOS_BUCKET_NAME;
const URL_EXPIRATION_SECONDS = 300;
const IMAGE_SIZE_CONSTRAINT = 1500;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10m

@Injectable()
export class ObjectUploadsService {
    constructor(private readonly objectsService: ObjectsService) {}

    async getSignedUploadURL({
        objectId,
        fileQuota,
    }: GetSignedUploadURLInputType) {
        if (!BUCKET_NAME) {
            throw new InternalServerErrorException('BUCKET_NAME not defined');
        }

        this.ensureBasketDefined();
        await this.ensureObjectExists(objectId);
        const safeObjectId = this.sanitizeObjectId(objectId);

        const promises: Promise<{
            fileId: string;
            fileExtension: string;
            url: string;
        }>[] = [];

        const makeCall = async (
            s3Params: Record<string, string | number>,
            fileId: string,
            fileExtension: string,
        ) => {
            return {
                fileId,
                fileExtension,
                url: await s3.getSignedUrlPromise('putObject', s3Params),
            };
        };

        const quotaKeys = Object.keys(fileQuota) as MimeType[];
        for (const fileMime of quotaKeys) {
            const fileExtension = fileMime === MimeType.png ? 'png' : 'jpg';
            const count = fileQuota[fileMime];

            for (let i = 0; i < count; i++) {
                const fileId = v4();
                const fileKey = this.makeFileKey(
                    safeObjectId,
                    fileId,
                    fileExtension,
                );

                const s3Params = {
                    Bucket: BUCKET_NAME,
                    Key: fileKey,
                    Expires: URL_EXPIRATION_SECONDS,
                    ContentType:
                        fileMime === MimeType.png ? 'image/png' : 'image/jpeg',
                };

                promises.push(makeCall(s3Params, fileId, fileExtension));
            }
        }

        return {
            data: (await Promise.all(promises)).map((item) => ({
                type: 'objectUploadUrl',
                attributes: {
                    url: item.url,
                    objectId: safeObjectId,
                    fileId: item.fileId,
                    fileMime: item.fileExtension,
                },
            })),
            aux: {},
        };
    }

    async attachFile({
        objectId,
        fileId,
        code,
        fileMime,
        author,
        source,
        capturedAt,
        capturedYearStart,
        capturedYearEnd,
    }: AttachFileInputType) {
        this.ensureBasketDefined();
        await this.ensureObjectExists(objectId);
        const item = await this.objectsService.getItem(objectId, [
            'id',
            'photos',
        ]);

        if (this.isImageAlreadyAttached(item.photos, fileId)) {
            throw new BadRequestException('File was already attached');
        }

        const safeObjectId = this.sanitizeObjectId(objectId);
        const key = this.makeFileKey(safeObjectId, fileId, fileMime);
        const fileSize = await this.getFileSize(key);

        if (fileSize && fileSize > MAX_FILE_SIZE) {
            await this.deleteFile(key);
            throw new BadRequestException('File size exceeds 10mb');
        }

        const file = await this.getFile(key);
        if (!file) {
            throw new NotFoundException('File was not found');
        }

        const fileContent = await this.prepareImage(file);

        const normalizedFileKey = this.makeFileKey(
            safeObjectId,
            v4(),
            MimeType.jpg,
        );
        await this.uploadFile(normalizedFileKey, fileContent);

        await this.objectsService.addPhotos(objectId, {
            author,
            source,
            code,
            capturedAt,
            capturedYearStart,
            capturedYearEnd,
            variants: {
                original: key,
                normalized: normalizedFileKey,
            },
        });

        return { data: null, aux: {} };
    }

    private isImageAlreadyAttached(
        photos: ObjectPhotoEntity[],
        fileId: string,
    ) {
        let result = false;
        photos.forEach((photo) => {
            if (result) {
                return;
            }

            Object.values(photo.variants).forEach((fileValue) => {
                if (fileValue.includes(fileId)) {
                    result = true;
                }
            });
        });

        return result;
    }

    private makeFileKey(objectId: string, fileId: string, extension: string) {
        return `${objectId}/${fileId}.${extension}`;
    }

    private getFileSize(key: string) {
        return tryExecute<number | undefined>(() => {
            return s3
                .headObject({ Key: key, Bucket: BUCKET_NAME! })
                .promise()
                .then((res) => res.ContentLength);
        }, 'Could not get file size');
    }

    private getFile(key: string) {
        return tryExecute<Buffer | undefined>(() => {
            return s3
                .getObject({ Key: key, Bucket: BUCKET_NAME! })
                .promise()
                .then((res) => res.Body as Buffer | undefined);
        }, 'Could not get file content');
    }

    private deleteFile(key: string) {
        return tryExecute(async () => {
            await s3.deleteObject({ Key: key, Bucket: BUCKET_NAME! }).promise();
        }, 'Could not delete file');
    }

    private async uploadFile(key: string, fileContent: Buffer) {
        return tryExecute(async () => {
            await s3
                .upload({
                    Bucket: BUCKET_NAME!,
                    Key: key,
                    ACL: 'public-read',
                    Body: fileContent,
                })
                .promise();
        }, 'Could not upload file');
    }

    private ensureBasketDefined() {
        if (!BUCKET_NAME) {
            throw new InternalServerErrorException('No basket specified');
        }
    }

    private async ensureObjectExists(objectId: string) {
        if (!(await this.objectsService.isExists(objectId))) {
            throw new NotFoundException('Object not found');
        }
    }

    private async prepareImage(file: Buffer) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const sharp = require(__DEV__ ? 'sharp' : '/opt/node_modules/sharp');

        let sharpFile = sharp(file);
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

    private sanitizeObjectId(objectId: string) {
        return objectId.replace(/([^a-f0-9-])+/g, '');
    }
}
