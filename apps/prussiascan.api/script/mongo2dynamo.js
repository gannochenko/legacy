#!/usr/bin/env node

const DynamoDB = require('aws-sdk').DynamoDB;
const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const Server = mongo.Server;

const awsOptions = {
    endpoint: 'http://localhost:4566',
    region: 'eu-central-1',
    accessKeyId: 'local',
    secretAccessKey: 'local',
};

const dynamoDB = new DynamoDB.DocumentClient({
    ...awsOptions,
    apiVersion: '2012-08-10',
});
const TABLE_NAME = 'prussiascan.api_ObjectCollection';

const MONGO_URI = 'mongodb://localhost:27017/?maxPoolSize=20&w=majority';

const client = new MongoClient(MONGO_URI);

async function run() {
    try {
        const db = await client.connect();
        const dbo = db.db('legacy');
        const registry = dbo.collection('registry');

        const findResult = await registry
            .find({
                // name: 'Lemony Snicket',
                // date: {
                //     $gte: new Date(new Date().setHours(00, 00, 00)),
                //     $lt: new Date(new Date().setHours(23, 59, 59)),
                // },
            })
            .toArray();

        console.log(findResult);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
