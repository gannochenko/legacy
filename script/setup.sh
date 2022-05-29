#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "$DIR"/.. || exit

yarn;

# add all the apps here
cd apps/ren39 && yarn && cd ../..
cd apps/prussiascan && yarn && cd ../..
cd apps/prussiascan.api && yarn && cd ../..
cd apps/prussiascan.auth && yarn && cd ../..
cd apps/prussiascan.aux.api && yarn && cd ../..
