#!/usr/bin/env bash

VENDOR="gannochenko"
APPLICATION_NAME="prussiascan.builder"

VERSION="${1:-latest}"
TAG=${VENDOR}/${APPLICATION_NAME}:${VERSION}

echo Building ${TAG} image;

if ! [ $? -eq 0 ]
then
    exit 1;
fi
docker build -t ${TAG} .;
