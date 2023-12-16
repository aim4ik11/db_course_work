import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
