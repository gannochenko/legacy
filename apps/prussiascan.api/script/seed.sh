#!/usr/bin/env bash

################################################################################################
## https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeValue.html
################################################################################################

# aws configure --profile legacy

ENDPOINT="--endpoint-url http://localhost:4566 --profile legacy"

################################################################################################
## DynamoDB Tables
################################################################################################

aws dynamodb ${ENDPOINT} list-tables
aws dynamodb ${ENDPOINT} \
    create-table \
    --table-name ObjectCollection \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
    --key-schema \
        AttributeName=id,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

aws s3api ${ENDPOINT} \
    create-bucket \
    --bucket=prussiascans-object-photos \
    --region=eu-central-1 \
    --create-bucket-configuration LocationConstraint=eu-central-1
