#!/usr/bin/env bash

sed -i 's/1\.0\.1/1\.0\.0/g' lerna.json;
sed -i 's/"1\.0\.1/"1\.0\.0/g' packages/core/package.json;
git tag -d v1.0.1;
git push origin :refs/tags/v1.0.1;
