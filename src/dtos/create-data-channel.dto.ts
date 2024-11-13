import {
  CreateDataChannelRequest,
} from '@adjustmode1/proto-files';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateDataChannelDto implements CreateDataChannelRequest {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  workspaceId!: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name!: string;
}
