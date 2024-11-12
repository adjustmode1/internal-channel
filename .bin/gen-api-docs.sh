#!/bin/bash

DIR="docs/grpc-api/docs/references"

mkdir -p "$DIR"

# Generate halome_proto_files.json fixture
protoc --doc_out="$DIR" \
--plugin=protoc-gen-doc=./.bin/protoc-gen-doc \
--doc_opt=json,halome_proto_files.json \
--proto_path=node_modules/google-proto-files --proto_path=./ \
halome/**/**/*.proto halome/**/**/**/*.proto

pushd "docs/grpc-api" || exit

# Generate docusaurus-protobuffet docs
pnpm run docusaurus generate-proto-docs

# Move new generated MDX to docusaurus docs folder
rm -rf docs/references/halome
mv -f protodocs/halome docs/references

popd || exit