#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
VERSION="${1:-latest}"
IMAGE=awesome1888/legacy.landing.ambar:${VERSION}

cd ${DIR}/../application/;
webpack --config webpack.server.js --mode production;
webpack --config webpack.client.js --mode production;

docker build -t ${IMAGE} -f ${DIR}/../application/docker/production.dockerfile .
docker push ${IMAGE}
docker rmi -f ${IMAGE}
