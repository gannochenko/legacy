#!/usr/bin/env bash

################################################################################################
## https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeValue.html
################################################################################################

# aws configure --profile legacy

export AWS_PAGER=""
AWS="aws --endpoint-url http://localhost:4566 --profile legacy"

read -p "Running this script will wipe out clean all your local data. Proceed? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then



################################################################################################
## DynamoDB
################################################################################################

echo "Delete tables"

${AWS} dynamodb \
    delete-table \
    --table-name "prussiascan.auth.api_GroupCollection"

echo "Re-create tables"

${AWS} dynamodb \
    create-table \
    --table-name "prussiascan.auth.api_GroupCollection" \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
    --key-schema \
        AttributeName=id,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
