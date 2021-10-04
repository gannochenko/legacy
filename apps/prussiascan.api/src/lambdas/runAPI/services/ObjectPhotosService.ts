import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 } from 'uuid';
import latinize from 'latinize';
import { DynamoDB } from 'aws-sdk';
import { ObjectEntity } from '../entities/ObjectEntity';
import {
    CreateObjectDto,
    // UpdateObjectDto,
} from '../rest/ObjectsController/ObjectsDTO';
import { awsOptions } from '../utils/awsOptions';
import { ServiceResponseType } from '../type';
import { ObjectPhotoEntity } from '../entities/ObjectPhotoEntity';
import sharp from 'sharp';

const dynamoDB = new DynamoDB.DocumentClient(awsOptions);
const TABLE_NAME = 'ObjectCollection';

const BUCKET_URL = process.env.AWS_OBJECT_PHOTOS_BUCKET_URL;
const IMAGE_SIZE_CONSTRAINT = 1500;

@Injectable()
export class ObjectPhotosService {
    async store(
        data: ObjectPhotoEntity,
        file: Express.Multer.File,
    ): Promise<void> {
        const { objectId } = data;

        const fileContent = this.prepareImage(file);

        // now save to S3

        // and then update the database record

        // const dynamodbItem = {
        //     ...item,
        //     id,
        //     slug,
        // };
        //
        // try {
        //     await dynamoDB
        //         .put({
        //             TableName: TABLE_NAME,
        //             Item: dynamodbItem,
        //             ReturnConsumedCapacity: 'TOTAL',
        //         })
        //         .promise();
        // } catch (error) {
        //     throw new InternalServerErrorException(error);
        // }
        //
        // return { data: dynamodbItem, aux: {} };
    }

    private async prepareImage(file: Express.Multer.File) {
        const { mimetype, buffer } = file;

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

        const isJpg = mimetype === 'image/jpeg';
        const isPng = mimetype === 'image/png';

        if (isPng) {
            sharpFile = await sharpFile.png({ quality: 90 });
        } else if (isJpg) {
            sharpFile = await sharpFile.jpeg({ quality: 90 });
        }

        return await sharpFile.toBuffer();
    }
}
