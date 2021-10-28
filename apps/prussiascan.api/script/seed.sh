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

${AWS} dynamodb \
    delete-table \
    --table-name "prussiascan.api_ObjectCollection"

${AWS} dynamodb \
    create-table \
    --table-name "prussiascan.api_ObjectCollection" \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
    --key-schema \
        AttributeName=id,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

${AWS} dynamodb list-tables

################################################################################################
## S3
################################################################################################

${AWS} s3 rb s3://prussiascans-object-photos --force

${AWS} s3 mb s3://prussiascans-object-photos
${AWS} s3api put-bucket-acl --bucket prussiascans-object-photos --acl public-read

${AWS} s3api list-buckets --query "Buckets[].Name"

fi
