#!/usr/bin/env bash

################################################################################################
## https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeValue.html
################################################################################################

# aws configure --profile legacy

AWS="aws dynamodb --endpoint-url http://localhost:4566 --profile legacy"

################################################################################################
## DynamoDB Tables
################################################################################################

${AWS} list-tables
${AWS} \
    create-table \
    --table-name ObjectCollection \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
    --key-schema \
        AttributeName=id,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
