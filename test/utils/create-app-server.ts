import {
  AllExceptionFilter,
  CustomValidatePipe,
} from '@halomeapis/nestjs-common-modules';
import { INestMicroservice } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import { dirname } from 'path';

import { GrpcModule } from '../../src/grpc.module';

export async function createAppServer(
  url = '0.0.0.0:5000',
): Promise<INestMicroservice> {
  const packages = ['halome.internal.user.v3.services'];
  const protoPath = [
    require.resolve(
      '@halomeapis/halome-proto-files/halome/internal/user/v3/services/data_user_profile.proto',
    ),
    require.resolve(
      '@halomeapis/halome-proto-files/halome/internal/user/v3/services/data_user_connect.proto',
    ),
    require.resolve(
      '@halomeapis/halome-proto-files/halome/internal/user/v3/services/data_user_visited_profile.proto',
    ),
  ];

  const includeDirs = [
    dirname(require.resolve('google-proto-files/package.json')),
    dirname(require.resolve('@halomeapis/halome-proto-files/package.json')),
  ];

  const module = await Test.createTestingModule({
    imports: [GrpcModule],
  }).compile();

  const app = module.createNestMicroservice({
    transport: Transport.GRPC,
    options: {
      url,
      package: packages,
      protoPath,
      loader: {
        includeDirs,
      },
    },
  });

  app.useGlobalPipes(
    new CustomValidatePipe({
      transform: true,
      validateGrpcMetadata: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionFilter());

  // Start gRPC microservice
  await app.listen();

  return app;
}
