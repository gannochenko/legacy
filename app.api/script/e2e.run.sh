#!/usr/bin/env bash

# usage:
# ./script/e2e.run.sh dev
# to run tests in the development mode
# ./script/e2e.run.sh
# to run in production

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";

if [[ "${1}" == "dev" ]]
then
    YML="-f ${DIR}/../infra/e2e/composition.development.yml"
else
    YML="-f ${DIR}/../infra/e2e/composition.production.yml"
fi

docker stop $(docker ps -aq) > /dev/null 2> /dev/null;

if [[ "${1}" == "dev" ]]
then
    docker-compose ${YML} up -d --force-recreate --renew-anon-volumes;
    sleep 30s;
    yarn run test:e2e:dev;
else
    docker-compose ${YML} build --no-cache;
    docker-compose ${YML} up --abort-on-container-exit;
fi
