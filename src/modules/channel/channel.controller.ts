import {
  CreateDataChannelResponse,
} from '../../typings';
import { Controller, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';

import {
  CreateDataChannelCommand,
} from './commands/impl';
import {CreateDataChannelDto} from "../../dtos";
import {ChannelEntity} from "../../typings";

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
      ChannelEntity | Error
    >(
      new CreateDataChannelCommand(
        data.workspaceId,
        data.name
      ),
    );

    if (result instanceof Error) {
      return {
        ok: false,
        error: result,
      };
    }

    return {
      data: result,
      ok: true,
    };
  }
}
