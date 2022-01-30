import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { v4 } from 'uuid';

import { awsOptions } from '../../utils/awsOptions';
import { CreateUserInputType, CreateUserOutputType } from './type';
import { tryExecute } from '../../utils/tryExecute';

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
const dynamoDB = new DynamoDB.DocumentClient({
    ...awsOptions,
    apiVersion: '2012-08-10',
});
const TABLE_NAME = process.env.AWS_USERS_TABLE_NAME ?? '';

@Injectable()
export class UserService {
    constructor() {}

    public async create(
        item: CreateUserInputType,
    ): Promise<CreateUserOutputType> {
        const { email } = item;

        const id = v4();
        const dynamodbItem = {
            id,
            email,
            createdAt: new Date().toISOString(),
        };

        await tryExecute(async () => {
            return await dynamoDB
                .put({
                    TableName: TABLE_NAME,
                    Item: dynamodbItem,
                })
                .promise();
        }, 'Could not create an user');

        return { data: dynamodbItem };
    }

    public async getByEmail(email: string) {
        const result = await tryExecute(async () => {
            return await dynamoDB
                .query({
                    TableName: TABLE_NAME,
                    IndexName: 'emailIndex',
                    ProjectionExpression: 'id, email',
                    KeyConditionExpression: '#email = :email',
                    ExpressionAttributeNames: {
                        '#email': 'email',
                    },
                    ExpressionAttributeValues: {
                        ':email': email,
                    },
                    Limit: 1,
                })
                .promise();
        }, 'Could not get a user by email');

        return result?.Items?.[0];
    }

    public async isEmailTaken(email: string) {
        const user = await tryExecute(async () => {
            return await dynamoDB
                .get({
                    TableName: TABLE_NAME,
                    Key: {
                        email,
                    },
                })
                .promise();
        }, 'Could not check the email existence');

        return !!user?.Item;
    }
}
