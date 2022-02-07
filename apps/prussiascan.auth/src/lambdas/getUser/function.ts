import { DynamoDB } from 'aws-sdk';
import jwt from 'jsonwebtoken';
import { awsOptions } from './awsOptions';

type GetUserArgsType = {
    token: string;
};

type GetUserResult = {
    data: {
        id?: string;
        type?: 'user';
        attributes?: {
            roles: string[];
        };
    };
    errors: {
        message: string;
        code?: string;
    }[];
    revoke: boolean;
};

type GetUserTokenContentResult = {
    userId: string;
};

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
const dynamoDB = new DynamoDB.DocumentClient({
    ...awsOptions,
    apiVersion: '2012-08-10',
});
const TABLE_NAME = process.env.AWS_USERS_TABLE_NAME ?? '';

export const fn = async ({ token }: GetUserArgsType) => {
    const result: GetUserResult = {
        data: {},
        errors: [],
        revoke: false,
    };

    try {
        const { userId } = jwt.verify(
            token,
            process.env.JWT_SECRET!,
        ) as GetUserTokenContentResult;

        // check if user exists
        const databaseResult = await dynamoDB
            .get({
                TableName: TABLE_NAME,
                Key: {
                    id: userId,
                },
                AttributesToGet: ['id', 'roles'],
            })
            .promise();

        if (!databaseResult?.Item) {
            result.errors.push({
                message: 'User not found',
            });
            result.revoke = true;
        } else {
            result.data = {
                id: userId,
                type: 'user',
                attributes: {
                    roles: databaseResult?.Item?.roles ?? [],
                },
            };
        }
    } catch (error) {
        result.errors.push({
            message: 'Token expired',
        });
        result.revoke = true;
    }

    return result;
};
