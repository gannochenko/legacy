import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 } from 'uuid';
import latinize from 'latinize';
import { DynamoDB } from 'aws-sdk';
import { awsOptions } from '../../utils/awsOptions';
import {
    CreateObjectInputType,
    CreateObjectOutputType,
    FindAllObjectsInputType,
    AddObjectPhotoInputType,
    FindAllObjectsOutputType,
    ObjectFieldsType,
    GetObjectByIdOutputType,
    AddObjectPhotoOutputType,
} from './type';
import { ObjectEntity } from '../../entities/ObjectEntity';

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
const dynamoDB = new DynamoDB.DocumentClient({
    ...awsOptions,
    apiVersion: '2012-08-10',
});
const TABLE_NAME = process.env.AWS_OBJECT_TABLE_NAME ?? '';

@Injectable()
export class ObjectsService {
    async create(item: CreateObjectInputType): Promise<CreateObjectOutputType> {
        const {
            name,
            content,
            yearBuiltStart,
            yearBuiltEnd,
            yearDemolishedStart,
            yearDemolishedEnd,
            demolished,
            condition,
            locationLat,
            locationLong,
            kind,
            materials,
        } = item;

        const id = v4();
        const slug = latinize(name)
            .toLowerCase()
            .replace(/(\s)+/g, '-')
            .replace(/[^a-zA-Z0-9-]/g, '');

        const dynamodbItem = {
            id,
            slug,
            name,
            content,
            yearBuiltStart,
            yearBuiltEnd,
            yearDemolishedStart,
            yearDemolishedEnd,
            demolished,
            condition,
            locationLat,
            locationLong,
            kind,
            materials,
            photos: [],
            createdAt: new Date().toISOString(),
        };

        try {
            await dynamoDB
                .put({
                    TableName: TABLE_NAME,
                    Item: dynamodbItem,
                    ReturnConsumedCapacity: 'TOTAL',
                })
                .promise();
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(
                'Could not create an object',
            );
        }

        return { data: dynamodbItem, aux: {} };
    }

    async findAll({
        limit,
        lastId,
    }: FindAllObjectsInputType = {}): Promise<FindAllObjectsOutputType> {
        try {
            const result = await dynamoDB
                .scan({
                    TableName: TABLE_NAME,
                    Limit: limit,
                    ExclusiveStartKey: lastId
                        ? {
                              id: lastId,
                          }
                        : undefined,
                })
                .promise();

            return {
                data: (result?.Items as ObjectFieldsType[]) ?? [],
                aux: {
                    lastId: (result?.LastEvaluatedKey?.id as string) ?? null,
                },
            };
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Could not query objects');
        }
    }

    // todo: get only the requested fields, don't use *
    async getById(id: string): Promise<GetObjectByIdOutputType> {
        const item = await this.getItem(id);
        return {
            data: (item as ObjectFieldsType) ?? null,
            aux: {},
        };
    }

    async addPhoto(
        id: string,
        input: AddObjectPhotoInputType,
    ): Promise<AddObjectPhotoOutputType> {
        // const item = await this.getItem(id, ['id', 'photos']);
        // if (!item) {
        //     throw new InternalServerErrorException('Item not found');
        // }
        //
        // const { photos } = item;
        //
        // const {
        //     path,
        //     author,
        //     capturedAt,
        //     capturedYearEnd,
        //     capturedYearStart,
        //     source,
        // } = input;
        //
        // const newPhotos = [
        //     ...(photos ?? {}),
        //     {
        //         path,
        //         author,
        //         source,
        //         capturedAt,
        //         capturedYearEnd,
        //         capturedYearStart,
        //         uploadedAt: new Date().toISOString(),
        //     },
        // ];
        //
        // try {
        //     await dynamoDB
        //         .update({
        //             TableName: TABLE_NAME,
        //             Key: { id },
        //             UpdateExpression: 'set photos = :x',
        //             ExpressionAttributeValues: {
        //                 ':x': newPhotos,
        //             },
        //             ReturnValues: 'UPDATED_NEW',
        //         })
        //         .promise();
        // } catch (error) {
        //     console.error(error);
        //     throw new InternalServerErrorException('Could not add photo');
        // }

        return {
            data: null,
            aux: {},
        };
    }

    async isExists(id: string): Promise<boolean> {
        return !!(await this.getItem(id, ['id']));
    }

    private async getItem(id: string, fields?: string[]) {
        try {
            const result = await dynamoDB
                .get({
                    TableName: TABLE_NAME,
                    Key: {
                        id,
                    },
                    ...(fields ? { AttributesToGet: fields } : {}),
                })
                .promise();

            return (result?.Item as ObjectEntity) ?? null;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Could not get an element');
        }
    }
}
