import { Injectable, HttpException } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { randomBytes } from 'crypto';
import { promisify } from 'util';

import { awsOptions } from '../../utils/awsOptions';
import {
    InviteInputType,
    JoinInputType,
    InviteOutputType,
    JoinOutputType,
} from './type';
import { tryExecute } from '../../utils/tryExecute';

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
const dynamoDB = new DynamoDB.DocumentClient({
    ...awsOptions,
    apiVersion: '2012-08-10',
});
const TABLE_NAME = process.env.AWS_INVITATION_TOKENS_TABLE_NAME ?? '';

const randomBytesAsync = promisify(randomBytes);

@Injectable()
export class InvitationService {
    constructor() {}

    public async invite(item: InviteInputType): Promise<InviteOutputType> {
        const { email } = item;

        // check if already invited
        const invitation = await tryExecute(async () => {
            return await dynamoDB
                .get({
                    TableName: TABLE_NAME,
                    Key: {
                        email,
                    },
                })
                .promise();
        }, 'Could not check the invitation existence');

        if (invitation?.Item) {
            throw new HttpException('User already invited', 409);
        }

        const dynamodbItem = {
            email,
            token: (await randomBytesAsync(48)).toString('hex'),
            createdAt: new Date().toISOString(),
        };

        await tryExecute(async () => {
            return await dynamoDB
                .put({
                    TableName: TABLE_NAME,
                    Item: dynamodbItem,
                })
                .promise();
        }, 'Could not create an invitation');

        return { data: dynamodbItem, aux: {} };
    }

    public async join(item: JoinInputType): Promise<JoinOutputType> {
        const { token } = item;

        // const dynamodbItem = {
        //     id,
        //     slug,
        //     name,
        //     createdAt: new Date().toISOString(),
        //     version: 1,
        // };
        //
        // try {
        //     await dynamoDB
        //         .put({
        //             TableName: TABLE_NAME,
        //             Item: dynamodbItem,
        //             ReturnConsumedCapacity: 'TOTAL',
        //         })
        //         .promise();
        //
        //     await this.optionsService.set(OptionCodes.dataUpdated, '1');
        // } catch (error) {
        //     console.error(error);
        //     throw new InternalServerErrorException(
        //         'Could not create an object',
        //     );
        // }

        return { data: {}, aux: {} };
    }

    private async sendInvitation() {}
}
