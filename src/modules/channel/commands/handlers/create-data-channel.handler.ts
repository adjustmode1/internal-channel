import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateDataChannelCommand } from '../impl';
import {ChannelEntity} from "../../../../typings";
import {ulid} from "ulid";

@CommandHandler(CreateDataChannelCommand)
export class CreateDataChannelHandler
  implements ICommandHandler<CreateDataChannelCommand>
{
  private readonly logger = new Logger(CreateDataChannelHandler.name);

  constructor() {}

  async execute({
    workspaceId,
    name
  }: CreateDataChannelCommand): Promise<
    ChannelEntity | Error
  > {
    this.logger.verbose('.execute', {
      workspaceId,
      name,
    });

    const result: ChannelEntity = {
      workspaceId: workspaceId,
      name: name,
      channelId: ulid(),
      message: ulid(),
      avatar: ulid(),
      type: "CHANNEL_TYPE_ENUM_CHANNEL"
    } as ChannelEntity

    return result;
  }
}
