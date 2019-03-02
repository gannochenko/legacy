#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";

docker stop $(docker ps -aq) > /dev/null;
docker-compose -f ${DIR}/../compose/local.yml up --build;
