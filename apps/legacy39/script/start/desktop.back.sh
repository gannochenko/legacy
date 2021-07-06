#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# start mongodb and images for development
cd ${DIR}/../../docker/;
docker stop $(docker ps -a -q);
# do not use  --remove-orphans here unless you want containers from other installations to be lost
docker-compose -f development.yml up -d --build;

export MONGO_URL=mongodb://localhost:3300/legacy;
export ROOT_URL=http://localhost:3500;

cd $DIR/../../app/desktop.back/src/ && meteor npm install
cd $DIR/../../app/desktop.back/src/ && npm start
