#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";

# start mongdb and images for development
cd ${DIR}/../../docker/;
docker stop $(docker ps -a -q);
# do not use  --remove-orphans here unless you want containers from other installations to be lost
docker-compose -f development.yml up -d --build; # --remove-orphans;

export MONGO_URL=mongodb://localhost:3300/legacy;
export ROOT_URL=http://localhost:3100;

cd $DIR/../../app/desktop.front/src/ && meteor npm install;
cd $DIR/../../app/desktop.front/src/ && npm start;
