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
        attributes?: Record<string, string | number>;
    };
    errors: {
        message: string;
        code?: string;
    }[];
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
    console.log('!!!!');
    console.log(TABLE_NAME);
    console.log(token);

    const result: GetUserResult = {
        data: {},
        errors: [],
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
                AttributesToGet: ['id'],
            })
            .promise();

        if (!databaseResult?.Item) {
            result.errors.push({
                message: 'User not found',
            });
        } else {
            result.data = {
                id: userId,
                type: 'user',
                attributes: {},
            };
        }
    } catch (error) {
        result.errors.push({
            message: 'Token expired',
        });
    }

    return result;
};
