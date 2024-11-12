export class CreateDataChannelCommand {
  constructor(
    public readonly workspaceId: string,
    public readonly channelId: string,
    public readonly name: string,
  ) {}
}
