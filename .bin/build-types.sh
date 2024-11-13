git submodule update --init --recursive

rm -rf typings

node_modules/.bin/proto-loader-gen-types --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js \
--includeDirs=node_modules/google-proto-files \
--includeDirs=./ \
--outDir=src/typings src/protos/halome/**/**/*.proto src/protos/halome/**/**/**/*.proto

rm -rf dist

npx tsx src/utils/write-index.ts

node_modules/.bin/tsc
