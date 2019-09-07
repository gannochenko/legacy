#!/usr/bin/env bash

yarn run build;
git add -A ./;
git commit -m "another build";
yarn run publish;


#DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
#
#yarn;
#
#yarn run lint;
#if ! [ $? -eq 0 ]
#then
#    exit 1;
#fi
#
#yarn run test:u;
#if ! [ $? -eq 0 ]
#then
#    exit 1;
#fi
#
#yarn run build;
#if ! [ $? -eq 0 ]
#then
#    exit 1;
#fi
#
##yarn version --patch;
#yarn publish;
