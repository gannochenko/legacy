#!/usr/bin/env bash

################################################################################################
## This script creates AWS resources needed to run this cloud native app with Localstack.
################################################################################################

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "$DIR"/.. || exit

read -p "Running this script will wipe out clean all your local data. Proceed? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then

# add all the apps here
cd apps/prussiascan.api && ./script/seed.sh && ./script/mongo2dynamo.js && cd ../..
cd apps/prussiascan.auth && ./script/seed.sh && cd ../..

fi
