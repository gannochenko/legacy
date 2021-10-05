import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 } from 'uuid';
import latinize from 'latinize';
import { DynamoDB } from 'aws-sdk';
import { ObjectEntity } from '../../entities/ObjectEntity';
import {
    CreateObjectDto,
    // UpdateObjectDto,
} from './ObjectsController/ObjectsDTO';
import { awsOptions } from '../../utils/awsOptions';
import { ServiceResponseType } from '../../type';

const dynamoDB = new DynamoDB.DocumentClient(awsOptions);
const TABLE_NAME = 'ObjectCollection';

type FindAllPropertiesType = {
    limit?: number;
    lastId?: string;
};

@Injectable()
export class ObjectsService {
    async create(
        item: CreateObjectDto,
    ): Promise<ServiceResponseType<ObjectEntity>> {
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

    // // todo: get only the requested fields, don't use *
    // async update(
    //     id: string,
    //     data: UpdateObjectDto,
    // ): Promise<ObjectEntity> {
    //     return null;
    // }

    // // todo: get only the requested fields, don't use *
    // async delete(id: string): Promise<ObjectEntity> {
    //     return null;
    // }

    async findAll({ limit, lastId }: FindAllPropertiesType = {}): Promise<
        ServiceResponseType<ObjectEntity[], { lastId: string | null }>
    > {
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
                data: (result?.Items as ObjectEntity[]) ?? [],
                aux: {
                    lastId: (result?.LastEvaluatedKey?.id as string) ?? null,
                },
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    // todo: get only the requested fields, don't use *
    async findOneById(id: string): Promise<ServiceResponseType<ObjectEntity>> {
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
                data: (result?.Item as ObjectEntity) ?? null,
                aux: {},
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
