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
            ...item,
            id,
            slug,
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
        try {
            const result = await dynamoDB
                .get({
                    TableName: TABLE_NAME,
                    Key: {
                        id,
                    },
                })
                .promise();

            return {
                data: (result?.Item as ObjectFieldsType) ?? null,
                aux: {},
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async addPhoto(
        id: string,
        input: AddObjectPhotoInputType,
    ): Promise<ServiceResponseType<null>> {
        return {
            data: null,
            aux: {},
        };
    }
}
