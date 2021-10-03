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

const dynamoDB = new DynamoDB.DocumentClient(awsOptions);
const TABLE_NAME = 'ObjectCollection';

type ObjectServiceResponseType<D, A = Record<string, unknown>> = {
    data: D;
    aux: A;
};

@Injectable()
export class ObjectPhotosService {
    async upload(
        item: CreateObjectDto,
    ): Promise<ObjectServiceResponseType<ObjectEntity>> {
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
}
