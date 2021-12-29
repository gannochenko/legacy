import axios from 'axios';
import { DynamoDB } from 'aws-sdk';
import { awsOptions } from './utils/awsOptions';

type TriggerDeploymentArgsType = Record<string, string>;

enum OptionCodes {
    dataUpdated = 'DATA_UPDATED',
}

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
const dynamoDB = new DynamoDB.DocumentClient({
    ...awsOptions,
    apiVersion: '2012-08-10',
});
const TABLE_NAME = process.env.AWS_OPTIONS_TABLE_NAME ?? '';

const setOption = async (code: string, value: string) => {
    await dynamoDB
        .put({
            TableName: TABLE_NAME,
            Item: {
                code,
                value,
            },
            ReturnConsumedCapacity: 'TOTAL',
        })
        .promise();
};

const getOption = async (code: string) => {
    const result = await dynamoDB
        .get({
            TableName: TABLE_NAME,
            Key: {
                code,
            },
        })
        .promise();

    return (result?.Item?.value as string) ?? null;
};

export const fn = async (_: TriggerDeploymentArgsType) => {
    const triggerUrl = process.env.DEPLOYMENT_TRIGGER_URL;
    if (!triggerUrl) {
        throw new Error('Trigger URL not set');
    }

    const dataUpdated = await getOption(OptionCodes.dataUpdated);
    if (dataUpdated === '1') {
        const result = await axios.post(triggerUrl);

        if (result.data?.job?.state !== 'PENDING') {
            throw new Error('Could not run re-deployment');
        }
    }

    await setOption(OptionCodes.dataUpdated, '0');
};
