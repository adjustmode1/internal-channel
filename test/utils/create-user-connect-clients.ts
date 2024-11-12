import * as GRPC from '@grpc/grpc-js';
import * as ProtoLoader from '@grpc/proto-loader';
import {
  data_user_connect,
  InternalDataUserConnectServiceClient,
} from '@halomeapis/halome-proto-files';
import { dirname } from 'path';

export async function CreateUserConnectClients(
  url = '0.0.0.0:5000',
): Promise<[InternalDataUserConnectServiceClient]> {
  const protoPath = [
    require.resolve(
      '@halomeapis/halome-proto-files/halome/internal/user/v3/services/data_user_connect.proto',
    ),
  ];

  const includeDirs = [
    dirname(require.resolve('google-proto-files/package.json')),
    dirname(require.resolve('@halomeapis/halome-proto-files/package.json')),
  ];
  // Load protobuf for test gRPC dispatch
  const proto = ProtoLoader.loadSync(protoPath, {
    defaults: true,
    includeDirs,
  });

  // Create raw grpc client object
  const protoGRPC = GRPC.loadPackageDefinition(
    proto,
  ) as unknown as data_user_connect.ProtoGrpcType;

  // Create client connected to started services at standard 3200 port
  const UserConnectClient =
    new protoGRPC.halome.internal.user.v3.services.InternalDataUserConnectService(
      url,
      GRPC.credentials.createInsecure(),
    );

  return [UserConnectClient];
}
