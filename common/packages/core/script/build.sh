#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BUILD_DIR=${DIR}/../build

rm -rf ${BUILD_DIR}/*;
touch ${BUILD_DIR}/.gitkeep;
npx tsc --p ${DIR}/../
