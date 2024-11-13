#!/bin/bash

pnpm run build-type
pnpm run build

find src -mindepth 1 -type d ! -path "src/proto" ! -path "src/typings" -exec rm -rf {} +
#find src -mindepth 1 ! -path "src/proto" ! -path "src/proto/*" ! -path "src/typings" ! -path "src/typings/*" -exec rm -rf {} +
