import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 } from 'uuid';
import latinize from 'latinize';
import { DynamoDB } from 'aws-sdk';
import { ObjectEntity } from '../entities/ObjectEntity';
import { CreateObjectDto } from '../rest/ObjectsController/ObjectsDTO';
import { awsOptions } from '../utils/awsOptions';

const dynamoDB = new DynamoDB.DocumentClient(awsOptions);
const TABLE_NAME = 'ObjectCollection';

@Injectable()
export class ObjectsService {
    async create(item: CreateObjectDto): Promise<ObjectEntity> {
        const { name } = item;

        const id = v4();
        const slug = latinize(name).toLowerCase().replace(/(\s)+/g, '-');

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
    //     id: IDType,
    //     data: AuthorUpdateInputType,
    // ): Promise<ObjectEntity> {
    //     return await this.usersRepository.findOne(id);
    // }
    //
    // // todo: get only the requested fields, don't use *
    // async delete(id: IDType): Promise<ObjectEntity> {
    //
    //     return element;
    // }
    //
    // async findAll({ filter, limit }: ObjectLiteralType = {}): Promise<
    //     ObjectEntity[]
    // > {
    //     return this.usersRepository.find(filter);
    // }
    //
    // // todo: get only the requested fields, don't use *
    // async findOneById(
    //     id: IDType,
    //     { select }: FindOneOptions<ObjectEntity> = {},
    // ): Promise<ObjectEntity> {
    //     return this.usersRepository.findOne(id, {
    //         select,
    //     });
    // }
    //
    // async isElementExists(id: IDType): Promise<boolean> {
    //     const element = await this.usersRepository.findOne(id, {
    //         select: ['id'],
    //     });
    //
    //     return !!element;
    // }
}
