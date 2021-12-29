#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ENV="${DIR}"/../.env
export AWS_PAGER=""

S3_BUCKET=gannochenko--legacy--prussiascan.aux.api--lambda-src
FN_NAME=${1}
FN_NAME_GLOBAL=prussiascan-aux-api_"${FN_NAME}"
ZIP=latest.zip
S3_KEY="${FN_NAME}"/"${ZIP}"
S3_REGION=eu-central-1

if [ -f "${ENV}" ]
then
  export $(cat "${ENV}" | xargs)
fi

aws s3api create-bucket --bucket="${S3_BUCKET}" --region="${S3_REGION}" --create-bucket-configuration LocationConstraint="${S3_REGION}"

# build
yarn || exit
yarn webpack --config webpack.build.config.js --mode production --entry ./src/lambdas/"${FN_NAME}"/handler.js -o ./build/lambdas/"${FN_NAME}"/ || exit
cd ./build/lambdas/"${FN_NAME}"
zip ./"${ZIP}" main.js

# deploy
aws s3 cp ./"${ZIP}" s3://"${S3_BUCKET}"/"${S3_KEY}"
aws lambda update-function-code --function-name "${FN_NAME_GLOBAL}" --s3-bucket "${S3_BUCKET}" --s3-key "${S3_KEY}" --region="${S3_REGION}"
