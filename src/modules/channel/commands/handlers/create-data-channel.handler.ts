import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateDataChannelCommand } from '../impl';

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
    string | Error
  > {
    this.logger.verbose('.execute', {
      workspaceId,
      name,
    });

    return `${workspaceId}/${name}`
  }
}
