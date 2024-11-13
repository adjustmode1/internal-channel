import {
  AllExceptionFilter,
  CustomValidatePipe,
  loadConfiguration,
} from '@halomeapis/nestjs-common-modules';
import { Logger, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { dirname, resolve } from 'path';
import {cwd} from 'process';

import { GrpcModule } from './grpc.module';

const config = new ConfigService(loadConfiguration());
const SERVICE_PORT = config.get('service.port');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageMeta = require(resolve('package.json'));

const PACKAGE = packageMeta.name;
const VERSION = packageMeta.version;
const LOG_LEVEL = config.get('log.level', [
  'log',
  'error',
  'warn',
] as LogLevel[]);

async function bootstrap() {
  const paths = [
    `${cwd()}/src/protos/halome/channel/v3/services/data_channel.proto`,
  ];

  const options = {
    url: `0.0.0.0:${SERVICE_PORT}`,
    package: ['halome.internal.channel.v3.services'],
    protoPath: paths.map((path) => require.resolve(path)),
    loader: {
      includeDirs: [
        dirname(require.resolve('google-proto-files/package.json')),
        dirname(require.resolve(`${cwd()}/package.json`)),
      ],
    },
    ...config.get('grpc.options', {}),
  };

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GrpcModule,
    { transport: Transport.GRPC, options, logger: LOG_LEVEL },
  );

  app.useGlobalPipes(
    new CustomValidatePipe({
      transform: true,
      validateGrpcMetadata: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionFilter());

  Logger.log('GRPC server initializing', options, GrpcModule.name);

  await app.listen();
}

bootstrap().then(() =>
  Logger.log(
    `${PACKAGE}@${VERSION} started at port ${SERVICE_PORT}`,
    GrpcModule.name,
  ),
);
