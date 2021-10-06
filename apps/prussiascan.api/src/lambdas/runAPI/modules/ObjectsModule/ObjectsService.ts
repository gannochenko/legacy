import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 } from 'uuid';
import latinize from 'latinize';
import { DynamoDB } from 'aws-sdk';
import { awsOptions } from '../../utils/awsOptions';
import { ServiceResponseType } from '../../type';
import {
    CreateObjectInputType,
    CreateObjectOutputType,
    FindAllObjectsInputType,
    AddObjectPhotoInputType,
    FindAllObjectsOutputType,
    ObjectFieldsType,
    GetObjectByIdOutputType,
} from './type';
import { ObjectEntity } from '../../entities/ObjectEntity';
import { ObjectPhotoEntity } from '../../entities/ObjectPhotoEntity';

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
const dynamoDB = new DynamoDB.DocumentClient(awsOptions);
const TABLE_NAME = 'ObjectCollection';

@Injectable()
export class ObjectsService {
    async create(item: CreateObjectInputType): Promise<CreateObjectOutputType> {
        const { name } = item;

        const id = v4();
        const slug = latinize(name)
            .toLowerCase()
            .replace(/(\s)+/g, '-')
            .replace(/[^a-zA-Z0-9-]/g, '');

        const dynamodbItem = {
            ...item, // todo: specify explicitly here!
            id,
            slug,
            photos: '',
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
            throw new InternalServerErrorException(error);
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
            throw new InternalServerErrorException(error);
        }
    }

    // todo: get only the requested fields, don't use *
    async getById(id: string): Promise<GetObjectByIdOutputType> {
        const item = await this.getItem(id);
        console.log(item);
        return {
            data: (item as ObjectFieldsType) ?? null,
            aux: {},
        };
    }

    async addPhoto(
        id: string,
        input: AddObjectPhotoInputType,
    ): Promise<ServiceResponseType<null>> {
        const item = await this.getItem(id, ['id', 'photos']);
        if (!item) {
            throw new InternalServerErrorException('Item not found');
        }

        const { photos } = item;

        let photoStructure: ObjectPhotoEntity[] = [];
        if (photos) {
            try {
                photoStructure = JSON.parse(photos) as ObjectPhotoEntity[];
            } catch (error) {
                photoStructure = [];
            }
        }

        const { path, year, period } = input;
        const newPhotosStructure = [
            ...photoStructure,
            {
                path,
                year,
                period,
            },
        ];

        try {
            const result = await dynamoDB
                .update({
                    TableName: TABLE_NAME,
                    Key: { id },
                    // AttributeUpdates: {
                    //     photos: {
                    //         Action: 'ADD',
                    //         Value: JSON.stringify(newPhotosStructure),
                    //     },
                    // },
                    UpdateExpression: 'set photos = :x',
                    ExpressionAttributeValues: {
                        ':x': JSON.stringify(newPhotosStructure),
                    },
                    ReturnValues: 'UPDATED_NEW',
                })
                .promise();

            console.log(result);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return {
            data: null,
            aux: {},
        };
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
            throw new InternalServerErrorException(error);
        }
    }
}
