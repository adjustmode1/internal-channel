import {
  CreateDataChannelResponse,
} from '@adjustmode1/proto-files';
import { Controller, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';

import {
  CreateDataChannelCommand,
} from './commands/impl';
import {CreateDataChannelDto} from "../../dtos";

@Controller()
export class ChannelController {
  private readonly logger = new Logger(ChannelController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod(
    'InternalDataChannelService',
    'CreateDataChannel',
  )
  async createDataChannel(
    data: CreateDataChannelDto,
  ): Promise<CreateDataChannelResponse> {
    this.logger.verbose('.CreateDataChannel', { data });

    const result = await this.commandBus.execute<
      CreateDataChannelCommand,
      string | Error
    >(
      new CreateDataChannelCommand(
        data.workspaceId,
        data.channelId,
        data.name
      ),
    );

    if (result instanceof Error) {
      return {
        ok: false,
        error: 'error',
      };
    }

    return {
      data: result,
      ok: true,
    };
  }
}
