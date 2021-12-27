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
    DynamoDBItemUpdateExpression,
} from './type';
import { ObjectEntity } from '../../entities';
import { tryExecute } from '../../utils/tryExecute';
import { OptionsService } from '../OptionsModule/OptionsService';
import { OptionCodes } from '../OptionsModule/type';

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
const dynamoDB = new DynamoDB.DocumentClient({
    ...awsOptions,
    apiVersion: '2012-08-10',
});
const TABLE_NAME = process.env.AWS_OBJECT_TABLE_NAME ?? '';

@Injectable()
export class ObjectsService {
    constructor(private readonly optionsService: OptionsService) {}

    public async create(
        item: CreateObjectInputType,
    ): Promise<CreateObjectOutputType> {
        const {
            name,
            nameDe,
            content,
            constructionYearStart,
            constructionYearEnd,
            lossYearStart,
            lossYearEnd,
            lost,
            altered,
            condition,
            location,
            locationDescription,
            locationArea,
            kind,
            materials,
            heritageId,
            heritageStatus,
            heritageLevel,
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
            nameDe,
            content,
            constructionYearStart,
            constructionYearEnd,
            lossYearStart,
            lossYearEnd,
            lost,
            altered,
            condition,
            location,
            locationDescription,
            locationArea,
            kind,
            materials,
            photos: [],
            // previewPhoto // todo
            // headerPhoto // todo
            createdAt: new Date().toISOString(),
            version: 1,
            heritageStatus,
            heritageLevel,
            heritageId,
        };

        try {
            await dynamoDB
                .put({
                    TableName: TABLE_NAME,
                    Item: dynamodbItem,
                    ReturnConsumedCapacity: 'TOTAL',
                })
                .promise();

            await this.optionsService.set(OptionCodes.dataUpdated, '1');
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(
                'Could not create an object',
            );
        }

        return { data: dynamodbItem, aux: {} };
    }

    public async findAll({
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
    public async getById(id: string): Promise<GetObjectByIdOutputType> {
        const item = await this.getItem(id);
        return {
            data: (item as ObjectFieldsType) ?? null,
            aux: {},
        };
    }

    public async addPhotos(
        id: string,
        input: AddObjectPhotoInputType,
    ): Promise<AddObjectPhotoOutputType> {
        const item = await this.getItem(id, ['id', 'photos']);
        if (!item) {
            throw new InternalServerErrorException('Item not found');
        }

        const { photos } = item;

        const {
            variants,
            author,
            capturedAt,
            capturedYearEnd,
            capturedYearStart,
            source,
            code,
        } = input;

        const newPhotos = [
            ...(photos ?? {}),
            {
                code,
                variants,
                author,
                source,
                capturedAt,
                capturedYearEnd,
                capturedYearStart,
                uploadedAt: new Date().toISOString(),
            },
        ];

        await this.updateItem(
            id,
            {
                UpdateExpression: 'photos = :x',
                ExpressionAttributeValues: {
                    ':x': newPhotos,
                },
            },
            'Could not add photo',
        );

        return {
            data: null,
            aux: {},
        };
    }

    public async isExists(id: string): Promise<boolean> {
        return !!(await this.getItem(id, ['id']));
    }

    public async getItem(id: string, fields?: string[]) {
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

    private async updateItem(
        id: string,
        expression: DynamoDBItemUpdateExpression,
        message = 'Could not update item',
    ) {
        return tryExecute(async () => {
            await dynamoDB
                .update({
                    TableName: TABLE_NAME,
                    Key: { id },
                    UpdateExpression: `SET ${expression.UpdateExpression}, updatedAt = :u, version = if_not_exists(version, :vs) + :vinc`,
                    ExpressionAttributeValues: {
                        ...expression.ExpressionAttributeValues,
                        ':u': new Date().toISOString(),
                        ':vs': 1,
                        ':vinc': 1,
                    },
                    ReturnValues: 'UPDATED_NEW',
                })
                .promise();
            await this.optionsService.set(OptionCodes.dataUpdated, '1');
        }, message);
    }
}
