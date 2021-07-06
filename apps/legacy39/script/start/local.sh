#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${DIR}/../../docker/;
docker stop $(docker ps -a -q);
# do not use  --remove-orphans here unless you want containers from other installations to be lost
docker-compose -f local.yml up -d;
