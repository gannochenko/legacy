#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";

npx npm-preinstall --monorepo --use-yarn

REBUILD=""
if [[ $1 = "-r" ]]; then
  REBUILD="--build"
fi

docker stop $(docker ps -aq) > /dev/null;
docker-compose -f ${DIR}/../compose/development.yml up ${REBUILD};
