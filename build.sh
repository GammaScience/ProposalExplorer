#!/bin/bash

YARNB=$(which yarn)
YARN=${YARNB:-$(which yarnpkg)}

$YARN install
npx ng build
mkdir -p ./build/code
rsync -rv --delete --exclude '*.map' dist/proposal-explorer/ ./build/code/
podman build -t proposalexplorer .
