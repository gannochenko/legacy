import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 } from 'uuid';
import latinize from 'latinize';
import { DynamoDB } from 'aws-sdk';
import { ObjectEntity } from '../entities/ObjectEntity';
import {
    CreateObjectDto,
    UpdateObjectDto,
} from '../rest/ObjectsController/ObjectsDTO';
import { awsOptions } from '../utils/awsOptions';

const dynamoDB = new DynamoDB.DocumentClient(awsOptions);
const TABLE_NAME = 'ObjectCollection';

type FindAllPropertiesType = {
    limit?: number;
};

@Injectable()
export class ObjectsService {
    async create(item: CreateObjectDto): Promise<ObjectEntity> {
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
            const result = await dynamoDB
                .put({
                    TableName: TABLE_NAME,
                    Item: dynamodbItem,
                    ReturnConsumedCapacity: 'TOTAL',
                })
                .promise();

            console.log(result);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return dynamodbItem;
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

    async findAll({ limit }: FindAllPropertiesType = {}): Promise<
        ObjectEntity[]
    > {
        return [];
    }

    // todo: get only the requested fields, don't use *
    async findOneById(id: string): Promise<ObjectEntity | null> {
        try {
            const result = await dynamoDB
                .get({
                    TableName: TABLE_NAME,
                    Key: {
                        id,
                    },
                })
                .promise();

            return (result?.Item as ObjectEntity) ?? null;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    // async isElementExists(id: IDType): Promise<boolean> {
    //     const element = await this.usersRepository.findOne(id, {
    //         select: ['id'],
    //     });
    //
    //     return !!element;
    // }
}
