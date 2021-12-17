#!/usr/bin/env bash

VENDOR="gannochenko"
APPLICATION_NAME="prussiascan.builder"

VERSION="${1:-latest}"
TAG=${VENDOR}/${APPLICATION_NAME}:${VERSION}

echo Pushing ${TAG} image;

docker push ${TAG}
