#!/usr/bin/env node

const DynamoDB = require('aws-sdk').DynamoDB;

const TABLE_SRC = 'ObjectCollectionBackuppp';
const TABLE_DST = 'prussiascan.api_ObjectCollection';
const PRODUCTION = true;

const awsOptions = PRODUCTION
    ? {
          region: 'eu-central-1',
          accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
      }
    : {
          endpoint: 'http://localhost:4566',
          region: 'eu-central-1',
          accessKeyId: 'local',
          secretAccessKey: 'local',
      };

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
const dynamoDB = new DynamoDB.DocumentClient({
    ...awsOptions,
    apiVersion: '2012-08-10',
});

async function run() {
    try {
        let lastKey;
        let itemCount = 0;
        let pages = 0;
        let allItems = [];
        do {
            let params = {
                TableName: TABLE_SRC,
            };
            if (lastKey) {
                params.ExclusiveStartKey = lastKey;
            }

            const result = await dynamoDB.scan(params).promise();

            const { LastEvaluatedKey, Count, Items } = result;
            lastKey = LastEvaluatedKey;
            itemCount += Count;
            pages += 1;

            allItems = [...allItems, ...Items];
        } while (lastKey && pages < 10);

        console.log(itemCount);
        // console.log(allItems);

        let itemBatch = [];
        for (const item of allItems) {
            itemBatch.push({
                PutRequest: {
                    Item: item,
                },
            });

            if (itemBatch.length === 25) {
                try {
                    await dynamoDB
                        .batchWrite({
                            RequestItems: {
                                [TABLE_DST]: itemBatch,
                            },
                        })
                        .promise();
                    console.log('Added a batch');
                } catch (error) {
                    console.log('Could not batch write');
                    console.error(error);
                }

                itemBatch = [];
            }
        }

        if (itemBatch.length) {
            await dynamoDB
                .batchWrite({
                    RequestItems: {
                        [TABLE_DST]: itemBatch,
                    },
                })
                .promise();
        }
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);
