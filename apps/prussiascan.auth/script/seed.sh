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
## https://docs.aws.amazon.com/cli/latest/reference/dynamodb/create-table.html
################################################################################################

echo "Delete tables"

${AWS} dynamodb \
    delete-table \
    --table-name "prussiascan.auth_Users"

${AWS} dynamodb \
    delete-table \
    --table-name "prussiascan.auth_InvitationTokens"

echo "Re-create tables"

${AWS} dynamodb \
    create-table \
    --table-name "prussiascan.auth_Users" \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
        AttributeName=email,AttributeType=S \
    --key-schema \
        AttributeName=id,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --global-secondary-indexes \
        "[
            {
                \"IndexName\": \"emailIndex\",
                \"KeySchema\": [
                    {\"AttributeName\":\"email\",\"KeyType\":\"HASH\"}
                ],
                \"Projection\": {
                    \"ProjectionType\":\"INCLUDE\",
                    \"NonKeyAttributes\":[\"email\"]
                },
                \"ProvisionedThroughput\": {
                    \"ReadCapacityUnits\": 5,
                    \"WriteCapacityUnits\": 5
                }
            }
        ]"

${AWS} dynamodb \
    create-table \
    --table-name "prussiascan.auth_InvitationTokens" \
    --attribute-definitions \
        AttributeName=email,AttributeType=S \
    --key-schema \
        AttributeName=email,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

fi
