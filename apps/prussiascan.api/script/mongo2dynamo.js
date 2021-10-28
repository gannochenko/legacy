#!/usr/bin/env node

const DynamoDB = require('aws-sdk').DynamoDB;
const MongoClient = require('mongodb').MongoClient;

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

// Set up the connection to the local db
const mongoclient = new MongoClient(new Server('localhost', 27017), {
    native_parser: true,
});

// Open the connection to the server
mongoclient.open((err, mongoclient) => {
    // Get the first db and do an update document on it
    var db = mongoclient.db('integration_tests');
    db.collection('mongoclient_test').update(
        { a: 1 },
        { b: 1 },
        { upsert: true },
        function (err, result) {
            assert.equal(null, err);
            assert.equal(1, result);

            // Get another db and do an update document on it
            var db2 = mongoclient.db('integration_tests2');
            db2.collection('mongoclient_test').update(
                { a: 1 },
                { b: 1 },
                { upsert: true },
                function (err, result) {
                    assert.equal(null, err);
                    assert.equal(1, result);

                    // Close the connection
                    mongoclient.close();
                },
            );
        },
    );
});
