#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

yarn;

# todo: ignore tests in linter
yarn run lint;
if ! [ $? -eq 0 ]
then
    exit 1;
fi

# todo: install peer dependencies here
#yarn run test:u
#if ! [ $? -eq 0 ]
#then
#    exit 1;
#fi

yarn run build;
if ! [ $? -eq 0 ]
then
    exit 1;
fi

#yarn version --patch;
yarn publish;
