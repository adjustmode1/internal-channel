import { loadConfiguration } from '@halomeapis/nestjs-common-modules';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';


import { ChannelModule } from "./modules/channel/channel.module";

@Module({
  imports: [
    CqrsModule,
    ChannelModule,
    ConfigModule.forRoot({
      load: [loadConfiguration],
      isGlobal: true,
    }),
  ],
  controllers: [],
})
export class GrpcModule {}
