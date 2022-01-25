import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 } from 'uuid';
import { DynamoDB } from 'aws-sdk';

import { awsOptions } from '../../utils/awsOptions';
import {
    InviteInputType,
    JoinInputType,
    InviteOutputType,
    JoinOutputType,
} from './type';

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
const dynamoDB = new DynamoDB.DocumentClient({
    ...awsOptions,
    apiVersion: '2012-08-10',
});
const TABLE_NAME = process.env.AWS_INVITATION_TOKENS_TABLE_NAME ?? '';

@Injectable()
export class InvitationService {
    constructor() {}

    public async invite(item: InviteInputType): Promise<InviteOutputType> {
        const { email } = item;

        const id = v4();

        const dynamodbItem = {
            id,
            email,
            createdAt: new Date().toISOString(),
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
            console.error(error);
            throw new InternalServerErrorException(
                'Could not create an invitation',
            );
        }

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
}
