#!/usr/bin/env bash

VENDOR="gannochenko"
APPLICATION_NAME="prussiascan.builder"

VERSION="${1:-latest}"
TAG=${VENDOR}/${APPLICATION_NAME}:${VERSION}

docker run -it -p 5000:5000 ${TAG}
